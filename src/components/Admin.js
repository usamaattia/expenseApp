//import React,{ useState } from 'react';
//import firestore from "./firestore";
import React, {useState} from 'react';
import firebase from "./firestore";

const db = firebase.firestore();
const User = () =>{
  const [data, setData] = useState({email: "", password:"", userId:"",pos:""});
  const [remove, setRemove]= useState({name:""})
  const addUser = e => {
            e.preventDefault();
            if (data.userId!==""){
              const userRef = db.collection("user").doc(data.userId).set({
                email: data.email,
                password: data.password,
                pos:data.pos,
                userId:data.userId
              });  
            }
            
            setData({
              pos:"",
              userId:"",
              email: "",
              password : "",
            });
            
          };

  const removeUser = e =>{
    e.preventDefault();
    if(remove.name !== ""){
      const res = db.collection('user').doc(remove.name).delete();
    }
    
    setRemove({
      name:"",
    });
  };
  return(
    
    <div>
      <h2>Add a person to the system: </h2>
      <br></br>
      <form onSubmit={addUser} >
        <input
          type="text"
          name="userId"
          placeholder="userId"
          onChange={e => setData({...data, userId: e.target.value})}
          value={data.userId}
          />
          <div className="group">
              <label for="pos">Choose Position:</label>
              <select name="pos" id="pos" onChange={e =>{
                        
              setData({...data, pos:document.getElementById("pos").value})
              }}>
              <option value=""></option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
                        
              </select>
              </div>
        <input
        type="email"
        name="email"
        placeholder="email"
        onChange={e => setData({...data, email: e.target.value})}
        value={data.email}
        />
        <input
        type="text"
        name="password"
        placeholder="password"
        onChange={e => setData({...data, password: e.target.value})}
        value={data.password}
        />
        <button type="submit">Add</button>
        </form>

        <br></br>


        <h2>Remove from the System</h2>
        <form onSubmit={removeUser}>
          <div className="group">
            <label htmlFor="remove">Print the user ID </label>
            <input 
            type="text" 
            name= "userId" 
            placeholder="Remove" 
            onChange={e => setRemove({...remove, name:e.target.value})} 
            value={remove.name}
            />
            <button type="submit">REMOVE</button>
          </div>
        </form>
        </div>
  );
};
export default User;