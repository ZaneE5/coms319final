import React, { useState, useEffect } from "react";
import {useForm} from "react-hook-form";

function App() {
    const [product, setProduct] = useState([]);
    const [oneProduct, setOneProduct] = useState([]);
    const [deleteProduct, setDeleteProduct] = useState([]);
    const [updateProduct, setUpdateProduct] = useState([]);
    const [reviews, setReviews] = useState([]);

    //form hooks
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: register2, formState: { errors: errors2 }, handleSubmit: handleSubmit2 } = useForm({});

    const [allviewer, setallViewer] = useState(false); //get all viewer
    const [oneviewer, setoneViewer] = useState(false); //get one viewer
    const [deleteviewer, setdeleteViewer] = useState(false); //delete viewer
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
        setTimeout(() => { addProduct(data); }, 2000);
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
    const addProductInputForm = (
        <div>
            <h3>Add a product:</h3>
            
            <form key={1} onSubmit={handleSubmit(order)} className="container mt-5">
                <div className="form-group">
                    <input {...register("id", { required: true })} placeholder="Id" className="form-control"/>
                    {errors.id && <p className="text-danger">Id is required.</p>}
                </div>
                <div className="form-group">
                    <input {...register("title", { required: true })} placeholder="Title" className="form-control"/>
                    {errors.title && <p className="text-danger">Title is required.</p>}
                </div>

                <div className="form-group">
                    <input {...register("price", {required: true})} placeholder="Price" className="form-control"/>
                    {errors.price && <p className="text-danger">Price is required.</p>}
                </div>

                <div className="form-group">
                    <input {...register("description", { required: true })} placeholder="Description" className="form-control"/>
                    {errors.description && <p className="text-danger">Description is required.</p>}
                </div>

                <div className="form-group">
                    <input {...register("category", { required: true })} placeholder="Category" className="form-control"/>
                    {errors.category && <p className="text-danger">Category is required.</p>}
                </div>

                <div className="form-group">
                    <input {...register("image", { required: true })} placeholder="Image Url" className="form-control"/>
                    {errors.image && <p className="text-danger">Image is required.</p>}
                </div>

                <div className="form-group">
                    <input {...register("rating", {required: true})} placeholder="Rating" className="form-control"/>
                    {errors.rating && <p className="text-danger">Rating is required.</p>}
                </div>

                <div className="form-group">
                    <input {...register("count", {required: true})} placeholder="Count" className="form-control"/>
                    {errors.count && <p className="text-danger">Count is required.</p>}
                </div>

                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </div>
    );



    function selectGame(id){
        getOneProduct(id);
        setViewer(2);
    }



    //get all
    const viewAllGames = (
        <div class="album py-5 bg-body-tertiary">
            <div class="container">
                <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 g-3">
                
                {product.map((el) => (
                    <div class="col">
                        <img src={el.image} width="100px" style={{float:"left", margin:"10px"}} alt="images"></img>
                          
                          <div class="card-body" style={{float:"left"}}>
                              <p class="card-text"><strong>{el.title}</strong></p>
                              <p class="card-text">{el.description}</p>
                              <p class="card-test">Average Rating: {el["avg-rating"]}</p>
                              <input type="button" value="View Reviews" style={{float:"right", margin:"10px"}} onClick={() => selectGame(el.id)} class="btn btn-outline-dark"></input>
                              <input type="button" value="Remove Game" style={{float:"right", margin:"10px"}} onClick={() => deleteItem(el)} class="btn btn-danger"></input>
                              <div class="d-flex justify-content-between align-items-center">
                              </div>
                          </div>
                    </div>))}

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
                        <img src={el.image} width="100px" style={{float:"left", margin:"10px"}} alt="images"></img>
                          
                          <div class="card-body" style={{float:"left"}}>
                              <p class="card-text"><strong>{el.title}</strong></p>
                              <p class="card-text">{el.description}</p>
                              <p class="card-test">Average Rating: {el["avg-rating"]}</p>
                              <div class="d-flex justify-content-between align-items-center">
                              </div>
                          </div>
                    </div>))}
                </div>
            </div>
        </div>
        
        <div>
            {reviews.map((el) => (
                <div style={{margin:"20px"}}>
                    <p class="card-text"><strong>Review</strong></p>
                    <p class="card-text">By: <strong>{el.user}</strong></p>
                    <p class="card-test">Rating: {el.rating}</p>
                    <p class="card-test">Description: {el.text}</p>
                </div>))}
        </div>

        </div>);

    function getOneProduct(id) {
        console.log(id);
        if (id >= 1) {
            fetch("http://localhost:8081/catalog/" + id)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Show one product :", id);
                    console.log(data);
                    let arr = [data];
                    setOneProduct(arr);
                    setReviews([data.reviews]);
            });
        if (false === oneviewer)
            setoneViewer(true);
        } else {
            console.log("Wrong number of Product id.");
            setoneViewer(false);
        }
    }






    

    //delete
    const showOneItemToDelete = 
        (<div>
            <h3>Delete one Product by Id:</h3>
            <input type="text" id="message" name="message" placeholder="id" onChange={(e) => getOneProductToDelete(e.target.value)} />

            {deleteProduct.map((el) => (
                <div key={el.id}>
                    <img src={el.image} width={30} alt="images" /> <br />
                    Title: {el.title} <br />
                    Category: {el.category} <br />
                    Price: {el.price} <br />
                    Rating: {el.rating.rate} <br />
                    <button type="button" className = "btn btn-secondary" variant="light" onClick={() => deleteItem(el)}> Confirm Delete</button>
                </div>
            ))}
        </div>
    );

    function deleteItem(el){
        console.log(el);
        var url = `http://localhost:8081/deleteItem/${el.id}`
    
        fetch(url, {method: 'DELETE'})
        .then(response => response.json())
        .then(data => console.log(data));

        setdeleteViewer(false);
        setDeleteProduct([]);
    }

    function getOneProductToDelete(id) {
        console.log(id);
        if (id >= 1) {
            fetch("http://localhost:8081/catalog/" + id)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Show one product :", id);
                    console.log(data);
                    let arr = [data];
                    setDeleteProduct(arr);
            });
        if (false === deleteviewer)
            setdeleteViewer(true);
        } else {
            console.log("Wrong number of Product id.");
            setdeleteViewer(false);
        }
    }







    //update
    const update = data => {
        data.price = parseInt(data.price);
        console.log(data);
        setTimeout(() => { updateItem(data); }, 2000);
    }

    function getOneProductToUpdate(id) {
        console.log(id);
        if (id >= 1) {
            fetch("http://localhost:8081/catalog/" + id)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Show one product :", id);
                    console.log(data);
                    let arr = [data];
                    setUpdateProduct(arr);
            });
        if (false === updateviewer)
            setupdateViewer(true);
        } else {
            console.log("Wrong number of Product id.");
        }
    }

    const showOneItemToUpdate = 
        (<div>
            <h3>Update one Product by Id:</h3>
            <input type="text" id="updatetextbox" name="message" placeholder="id" onChange={(e) => getOneProductToUpdate(e.target.value)} />
            
            {updateProduct.map((el) => (
                <div key={el.id}>
                    <img src={el.image} width={30} alt="images" /> <br />
                    Title: {el.title} <br />
                    Category: {el.category} <br />
                    Price: {el.price} <br />
                    Rating: {el.rating.rate} <br />
                    <form key={2} onSubmit={handleSubmit2(update)} className="container mt-5">
                        <div className="form-group">
                            <input {...register2("price", {required: true})} id="updatetextbox" placeholder="Price" className="form-control"/>
                            {errors2.price && <p className="text-danger">Price is required.</p>}
                        </div>
                    <button type="submit" className="btn btn-primary">Update Product</button>
                </form>
            </div>))}
        </div>
    );

    function updateItem(data){
        var id = document.getElementById("updatetextbox").value;
        console.log(id);
        console.log(data);
        var url = `http://localhost:8081/update/${id}`;
    
        fetch(url, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => console.log(data));

        setUpdateProduct([]);

        setupdateViewer(false);
    }


    const showAuthors = (
        <section class="py-5 text-center container">
            <div class="row py-lg-5">
                <div class="col-lg-6 col-md-8 mx-auto" id="title">
                    <h1 class="fw-light">About the Authors</h1>
                    <p><strong>Class: </strong>SE/ComS319 Construction of User Interfaces, Spring 2024</p>
                    <p><strong>Date: </strong>4/27/2024</p>
                    <p><strong>Students: </strong>Benjamin Diaz and Zane Eason</p>
                    <p><strong>Professor: </strong>Dr. Abraham Aldaco</p>
                    <p><strong>Emails: </strong>bdiaz9@iastate.edu and zseason@iastate.edu</p>
                    <p><strong>About the project: </strong>Develop a MERN (MongoDB, Express, React, Nodejs) application for managing a catalog of items using the
"https://fakestoreapi.com/products" dataset. Implement key CRUD functionalities and ensure a well-organized,
user-friendly interface.</p>
                </div>
            </div>
        </section>
    );

    function setViewer(number) {
        if (number == 1){
            setallViewer(!allviewer);
            setoneViewer(false);
            setaddViewer(false);
            setdeleteViewer(false);
            setupdateViewer(false);
            setauthorViewer(false);
        }
        if (number == 2){
            setallViewer(false);
            setoneViewer(!oneviewer);
            setaddViewer(false);
            setdeleteViewer(false);
            setupdateViewer(false);
            setauthorViewer(false);
        }
        if (number == 3){
            setallViewer(false);
            setoneViewer(false);
            setaddViewer(!addviewer);
            setdeleteViewer(false);
            setupdateViewer(false);
            setauthorViewer(false);
        }
        if (number == 4){
            setallViewer(false);
            setoneViewer(false);
            setaddViewer(false);
            setdeleteViewer(!deleteviewer);
            setupdateViewer(false);
            setauthorViewer(false);
        }
        if (number == 5){
            setallViewer(false);
            setoneViewer(false);
            setaddViewer(false);
            setdeleteViewer(false);
            setupdateViewer(!updateviewer);
            setauthorViewer(false);
        }
        if (number == 6){
            setallViewer(false);
            setoneViewer(false);
            setaddViewer(false);
            setdeleteViewer(false);
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
            {deleteviewer && showOneItemToDelete}
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
