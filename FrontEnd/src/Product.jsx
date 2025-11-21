import React, { useState,useEffect } from "react";
import axios from "axios";

function Product (){
    const [products,setProducts] = useState([])
    const [form,setForm] = useState({name : "",price : ""})
    const [selectedId,setSelectedId] = useState(null)

    const apiUrl = 'https://localhost:7132/api/Product'

    const GetAllProducts = async () => {
        try{
        const res = await axios.get(apiUrl)
        if(res){
        setProducts(res.data)
        }
        }catch (e){
        console.log("Error fetching users:", e);
        }
    }

    useEffect(()=>{
    GetAllProducts();
    },[])



    const handleChange =(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
    }

    const handleCreateorUpdate = async()=>{
        if(selectedId== null){
            await axios.post(apiUrl,form)
        }
        else{
            await axios.put(`${apiUrl}/${selectedId}`,form)
            setSelectedId(null)
        }
        GetAllProducts();
        clearForm();
    }
    const clearForm = ()=>{
        setForm({name: "", price : ""})
    }
    const handleEdit =(p)=>{
        setSelectedId(p.id)
        setForm({name: p.name || "", price : p.price || ""})
    }
    const handleDelete = async (id) => {
        await axios.delete(`${apiUrl}/${id}`);
        GetAllProducts();
    };

  return (
        <div style={{ padding: "20px" }}>
        <h2>Simple React + .NET CRUD</h2>

        {/* Form */}
        <input
            name="name"
            placeholder="Product Name"
            value={form.name ||""}
            onChange={handleChange}
        />
        <input
            name="price"
            placeholder="Price"
            value={form.price ||""}
            onChange={handleChange}
        />
        <button onClick={handleCreateorUpdate}>
            {selectedId ? "Update" : "Create"}
        </button>

        <hr />

        {/* Product List */}
        <h3>Products</h3>
        {products.map((p) => (
            <div key={p.id}>
            {p.name} - ₹{p.price}
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
        ))}
        </div>
    );
}
export default Product;