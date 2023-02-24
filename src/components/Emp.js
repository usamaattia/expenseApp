import React, { useState } from 'react';
import firebase from "./firestore";

function Emp({Logout,name}) {
    const [out , setOut] = useState({amount:"",email:"",password:""});
    const [formData, setFormData] = useState({name:name,title:"",amount:"",curr:"",description:""})
    const click = e => {
        e.preventDefault();
        Logout(out); 
    }
    const addData = e => {
        e.preventDefault();
       
        
        
        const db = firebase.firestore();
        const dataRef = db.collection("claimForm").add({
          name:formData.name,
          title: formData.title,
          amount: formData.amount,
          curr: formData.curr,
          description: formData.description,
          status:"false"

        });  
        setFormData({
            title: "",
            amount: "",
            curr: "",
            description: ""
        });
      };

      
    return (
        <div>
            <h2>Claim form</h2>
            <form onSubmit={addData}>
                <div className="group">
                    <label htmlFor="title">title</label>
                    <input
                        type="text"
                        placeholder="title"
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        value={formData.title}
                    />
                </div>
                <div className="group">
                    <label htmlFor="amount">Amount: </label>
                    <input
                        type="text"
                        placeholder="Amount"
                        onChange={e => setFormData({...formData, amount: e.target.value})}
                        value={formData.amount}
                    />
                </div>
                
                <div className="group">
                    <label htmlFor="curr">Choose currency:</label>
                    <select name="curr" id="curr" onChange={e =>{
                        
                        setFormData({...formData, curr:document.getElementById("curr").value})
                    }}>
                        <option value=""></option>
                        <option value="$">$</option>
                        <option value="€">€</option>
                        <option value="£">£</option>
                    </select>
                </div>
                
                <div className="group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="textarea"
                        placeholder="description"
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        value={formData.description}
                    />
                </div>   
                <button type="submit">Submit</button>
            </form>
            <button onClick={click}>Logout</button>
        </div>
    )
}

export default Emp