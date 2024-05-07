var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";
const {MongoClient} = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "final";
const client = new MongoClient(url);
const db = client.db(dbName);


app.listen(port, () => {
console.log("App listening at http://%s:%s", host, port);
});

app.get("/catalog", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
    .collection("games")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

app.get("/catalog/:id", async (req, res) => {
    const itemid = Number(req.params.id);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": itemid };
    const results = await db.collection("games")
    .findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});


app.post("/addItem", async (req, res) => {
    try{
        await client.connect();
        const values = Object.values(req.body);

        const newDocument = {
            "id": values[0],
            "title": values[1],
            "description": values[2],
            "totalRatings": parseInt(values[5]),
            "numRatings": 1,
            "avgRating": parseInt(values[5]),
            "image": values[3],
            "reviews": [
                {
                    "user": values[4],
                    "rating": parseInt(values[5]),
                    "text": values[6]
                }
            ]
        }

        console.log(newDocument);

        const results = await db
        .collection("games")
        .insertOne(newDocument);

        res.status(200);
        res.send(results);
    } catch(error) {
        console.error("An error occurred: ", error);
        res.status(500).send({error: 'An internal server error occurred'});
    }
});

app.delete("/deleteItem/:id", async (req, res) => {
    try{
        await client.connect();
        const itemid = parseInt(req.params.id);

        const results = await db
        .collection("games")
        .deleteOne({id: itemid});

        res.status(200);
        res.send(results);
    } catch(error) {
        console.error("An error occurred: ", error);
        res.status(500).send({error: 'An internal server error occurred'});
    }
})

app.put("/update/:id", async (req, res) => {
    try{
        await client.connect();
        const gameid = parseInt(req.params.id);
        const newReview = req.body;

        const game = await db
        .collection("games")
        .findOne({"id": gameid});

        const newNumRatings = game.numRatings + 1;
        const newTotalRatings = game.totalRatings + newReview.rating;
        const newAvgRating = newTotalRatings / newNumRatings;

        const results = await db
        .collection("games")
        .updateOne(
            { "id": gameid },
            {
                $push: { "reviews": newReview },
                $set: { 
                    "numRatings": newNumRatings,
                    "totalRatings": newTotalRatings,
                    "avgRating": newAvgRating
                }
            }
        );

        res.status(200);
        res.send(results);
    } catch(error) {
        console.error("An error occurred: ", error);
        res.status(500).send({error: 'An internal server error occurred'});
    }
});