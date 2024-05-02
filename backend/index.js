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
const dbName = "reactdata";
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
    .collection("fakestore_catalog")
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
    const results = await db.collection("fakestore_catalog")
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
            "price": values[2],
            "description": values[3],
            "category": values[4],
            "image": values[5],
            "rating": {
                "rate": values[6],
                "count": values[7]
            }
        }

        console.log(newDocument);

        const results = await db
        .collection("fakestore_catalog")
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
        .collection("fakestore_catalog")
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
        const itemid = parseInt(req.params.id);
        const values = Object.values(req.body);

        const results = await db
        .collection("fakestore_catalog")
        .updateOne({id: itemid}, {$set:{price:values[0]}});

        res.status(200);
        res.send(results);
    } catch(error) {
        console.error("An error occurred: ", error);
        res.status(500).send({error: 'An internal server error occurred'});
    }
});