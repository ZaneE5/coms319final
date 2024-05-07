import React, { useState, useEffect } from "react";
import {useForm} from "react-hook-form";

function App() {
    const [product, setProduct] = useState([]);
    const [oneProduct, setOneProduct] = useState([]);
    const [reviews, setReviews] = useState([]);

    //form hooks
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: register2, formState: { errors: errors2 }, handleSubmit: handleSubmit2 } = useForm({});

    const [allviewer, setallViewer] = useState(false); //get all viewer
    const [oneviewer, setoneViewer] = useState(false); //get one viewer
    const [updateviewer, setupdateViewer] = useState(false); //update viewer
    const [addviewer, setaddViewer] = useState(false); //add viewer
    const [authorviewer, setauthorViewer] = useState(false); //add viewer



    //initial loading of all products
    useEffect(() => {
        getAllProducts();
        setallViewer(true);
    }, []);




    //add 
    const order = data => {
        data.id = parseInt(data.id);
        console.log(data);
        addProduct(data);
        setTimeout(() => { getAllProducts(); }, 2000);
    }
    function addProduct(data){
        var url = `http://localhost:8081/addItem`
    
        fetch(url, { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(data)})
            .then(response => response.json())
            .then(data => console.log(data));
    }
    const onInvalid = (errors) => console.error(errors);

    const addProductInputForm = (
        <div>
            
            <form key={1} onSubmit={handleSubmit(order, onInvalid)} className="container mt-5">
                <p style={{margin:"10px"}}><strong>Add a product:</strong></p>
                <div className="form-group">
                    <input {...register("id", { required: true })} placeholder="Id" className="form-control"/>
                    {errors.id && <p className="text-danger">Id is required.</p>}
                </div>

                <div className="form-group">
                    <input {...register("title", { required: true })} placeholder="Title" className="form-control"/>
                    {errors.title && <p className="text-danger">Title is required.</p>}
                </div>

                <div className="form-group">
                    <input {...register("description", { required: true })} placeholder="Description" className="form-control"/>
                    {errors.description && <p className="text-danger">Description is required.</p>}
                </div>

                <div className="form-group">
                    <input {...register("image", { required: true })} placeholder="Image Url" className="form-control"/>
                    {errors.image && <p className="text-danger">Image is required.</p>}
                </div>

                <p style={{margin:"10px"}}><strong>And add an initial review:</strong></p>

                <div className="form-group">
                    <input {...register("user", { required: true })} placeholder="Username" className="form-control"/>
                    {errors.user && <p className="text-danger">Username is required.</p>}
                </div>

                <div className="form-group">
                    <input {...register("rating", { required: true })} placeholder="Rating" className="form-control"/>
                    {errors.rating && <p className="text-danger">Rating is required.</p>}
                </div>

                <div className="form-group">
                    <input {...register("text", { required: true })} placeholder="Explanation" className="form-control"/>
                    {errors.text && <p className="text-danger">Explanation is required.</p>}
                </div>

                <button type="submit" style={{float:"right", margin:"10px"}} className="btn btn-primary">Add Product</button>
                
                <button style={{float:"right", margin:"10px"}} onClick={() => setViewer(1)} className="btn btn-secondary">Return</button>
            </form>
        </div>
    );



    function selectGame(id){
        getOneGame(id);
        setViewer(2);
    }



    //get all
    const viewAllGames = (
        <div class="album py-5 bg-body-tertiary">
            <div class="container">
                <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 g-4">
                
                {product.map((el) => (
                    <div class="col">
                        <img src={el.image} width="300" style={{float:"left", margin:"10px"}} alt="images"></img>
                          
                          <div class="card-body" style={{float:"left"}}>
                              <p class="card-text"><strong>{el.title}</strong></p>
                              <p class="card-text">{el.description}</p>
                              <p class="card-test">Average Rating: {el.avgRating}</p>
                              <input type="button" value="View Reviews" style={{float:"right", margin:"10px"}} onClick={() => selectGame(el.id)} class="btn btn-outline-dark"></input>
                              <input type="button" value="Remove Game" style={{float:"right", margin:"10px"}} onClick={() => deleteItem(el)} class="btn btn-danger"></input>
                              <div class="d-flex justify-content-between align-items-center">
                              </div>
                          </div>
                          <hr></hr>
                    </div>
                    ))}

                    <hr></hr>

                    <div class="col">
                          <div class="card-body" style={{float:"left"}}>
                              <p class="card-text"><strong>Add A New Game</strong></p>
                              <p class="card-text">Not seeing what you're looking for? Add your favorite game here!</p>
                              <input type="button" value="Add Game" style={{float:"right", margin:"10px"}} onClick={() => setViewer(3)} class="btn btn-outline-dark"></input>
                              <div class="d-flex justify-content-between align-items-center">
                              </div>
                          </div>
                    </div>
                </div>
            </div>
        </div>);

    function getAllProducts() {
        fetch("http://localhost:8081/catalog")
            .then((response) => response.json())
            .then((data) => {
                console.log("Show Catalog of Products :");
            console.log(data);
            setProduct(data);
            });
        setViewer(1);
    }




    //get one
    const showOneItem = (
        <div>
        <div class="album py-5 bg-body-tertiary">
            <div class="container">
                <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 g-3">
                
                {oneProduct.map((el) => (
                    <div class="col">
                        <img src={el.image} width="300" style={{float:"left", margin:"10px"}} alt="images"></img>
                          
                          <div class="card-body" style={{float:"left"}}>
                              <p class="card-text"><strong>{el.title}</strong></p>
                              <p class="card-text">{el.description}</p>
                              <p class="card-test">Average Rating: {el["avg-rating"]}</p>
                              <button style={{float:"right", margin:"10px"}} onClick={() => setViewer(5)} class="btn btn-outline-dark">Add Review</button>
                              <button style={{float:"right", margin:"10px"}} onClick={() => setViewer(1)} className="btn btn-secondary">Return</button>
                              <div class="d-flex justify-content-between align-items-center">
                              </div>
                          </div>
                    </div>))}

                {reviews.map((el) => (
                    <div style={{margin:"20px"}}>
                        <hr></hr>
                        <p class="card-text"><strong>Review</strong></p>
                        <p class="card-text">By: {el.user}</p>
                        <p class="card-test">Rating: {el.rating}</p>
                        <p class="card-test">Description: {el.text}</p>
                    </div>))}
                </div>
            </div>
        </div>
    </div>);

    function getOneGame(id) {
        console.log(id);
        if (id >= 1) {
            fetch("http://localhost:8081/catalog/" + id)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Show one product :", id);
                    console.log(data);
                    console.log(data.reviews);
                    let arr = [data];
                    setOneProduct(arr);
                    setReviews(data.reviews);
                    console.log(reviews);
            });
        if (false === oneviewer)
            setoneViewer(true);
        } else {
            console.log("Wrong number of Product id.");
            setoneViewer(false);
        }
    }






    

    function deleteItem(el){
        console.log(el);
        var url = `http://localhost:8081/deleteItem/${el.id}`
    
        fetch(url, {method: 'DELETE'})
        .then(response => response.json())
        .then(data => console.log(data));

        setTimeout(() => { getAllProducts();}, 2000);
    }







    //update
    const update = data => {
        data.rating = parseInt(data.rating);
        console.log(data);
        updateItem(data);
        setTimeout(() => { getAllProducts();}, 2000);
    }

    const showOneItemToUpdate = (
        <div>
            
        <form key={2} onSubmit={handleSubmit2(update, onInvalid)} className="container mt-5">
            <p style={{margin:"10px"}}><strong>Add a Review:</strong></p>

            <div className="form-group">
                <input {...register2("user", { required: true })} placeholder="Username" className="form-control"/>
                {errors2.user && <p className="text-danger">Username is required.</p>}
            </div>

            <div className="form-group">
                <input {...register2("rating", { required: true })} placeholder="Rating" className="form-control"/>
                {errors2.rating && <p className="text-danger">Rating is required.</p>}
            </div>

            <div className="form-group">
                <input {...register2("text", { required: true })} placeholder="Explanation" className="form-control"/>
                {errors2.text && <p className="text-danger">Explanation is required.</p>}
            </div>

            <button type="submit" style={{float:"right", margin:"10px"}} className="btn btn-primary">Add Review</button>
            
            <button style={{float:"right", margin:"10px"}} onClick={() => setViewer(2)} className="btn btn-secondary">Return</button>
        </form>
    </div>
    );

    function updateItem(data){
        console.log(data);
        console.log(oneProduct[0].id);
        var url = `http://localhost:8081/update/${oneProduct[0].id}`;
    
        fetch(url, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => console.log(data));
    }


    const showAuthors = (
        <section class="py-5 container">
            <div class="row py-lg-5">
                <div class="col-lg-6 col-md-8 mx-auto" id="title">
                    <h1 class="fw-light">About the Authors</h1> <br></br>
                    <p><strong>Class: </strong>SE/ComS319 Construction of User Interfaces, Spring 2024</p>
                    <p><strong>Date: </strong>4/08/2024</p>
                    <p><strong>Students: </strong>Benjamin Diaz and Zane Eason</p>
                    <p><strong>Professors: </strong>Dr. Abraham N. Aldaco Gastelum and Dr. Ali Jannesari</p>
                    <p><strong>Student Emails: </strong>bdiaz9@iastate.edu and zseason@iastate.edu</p>
                    <p><strong>Professor Emails: </strong>aaldaco@iastate.edu and jannesar@iastate.edu</p>
                </div>
            </div>
        </section>
    );

    function setViewer(number) {
        if (number == 1){
            setallViewer(!allviewer);
            setoneViewer(false);
            setaddViewer(false);
            setupdateViewer(false);
            setauthorViewer(false);
        }
        if (number == 2){
            setallViewer(false);
            setoneViewer(!oneviewer);
            setaddViewer(false);
            setupdateViewer(false);
            setauthorViewer(false);
        }
        if (number == 3){
            setallViewer(false);
            setoneViewer(false);
            setaddViewer(!addviewer);
            setupdateViewer(false);
            setauthorViewer(false);
        }
        if (number == 5){
            setallViewer(false);
            setoneViewer(false);
            setaddViewer(false);
            setupdateViewer(!updateviewer);
            setauthorViewer(false);
        }
        if (number == 6){
            setallViewer(!allviewer);
            setoneViewer(false);
            setaddViewer(false);
            setupdateViewer(false);
            setauthorViewer(!authorviewer);
        }
    }
    
    const title = (
        <section class="py-5 text-center container">
            <div class="row py-lg-5">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <h1 class="fw-light">Game Forum</h1>
                    <p class="lead text-body-secondary">Below are the games that have been reviewed:</p>
                </div>
            </div>
        </section>
    );



    return ( 
    <div>
        <header data-bs-theme="dark">
            <div class="navbar navbar-dark bg-dark shadow-sm pt-5 pb-5">
                <div class="container d-flex justify-content-between">
                    <a href="#" class="navbar-brand d-flex align-items-center">
                        Game Forum
                    </a>

                    <div class="d-flex align-items-center">
                        <input type="button" value="About the Authors" onClick={() => setViewer(6)} class="btn btn-outline-light"></input>
                    </div>
                </div>
            </div>
        </header>

        {allviewer && title}

        {allviewer && viewAllGames}

        <div>
            {oneviewer && showOneItem}
        </div>

        <div>
            {updateviewer && showOneItemToUpdate}
        </div>

        <div>
            {addviewer && addProductInputForm}
        </div>

        <div>
            {authorviewer && showAuthors}
        </div>

    </div>
    ); // return end
} // App end

export default App;
