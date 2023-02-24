import React,{useState,useEffect} from 'react';
import firebase from './firestore'
import './Login.css'

function Login({Loginn,error,userLogin}) {
    const [details , setDetails] = useState({name:"",email:"",password:""});
    const [usernames,setUsername]=useState()
    //const [emp,setEmp]=useState({userId:"",emaill:"", passwordd:"",pos:""});
    
    const db = firebase.firestore();
    const [user,setUser]=useState([]);
    const submitHandler = e=> {
        e.preventDefault();
        
        db.collection("user").get().then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        // console.log(data);
        setUser(data)
        });
        
        for(var i=0; i < user.length; i++)
        {
            if(details.name === user[i].userId )
            {
                
              userLogin(details,user[i]);  
            }
            
        }
        Loginn(details); 
        

    }

    
    
    //submitHandler();
    
    
    
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="in-form">
                    <h2>Login</h2>
                   
                        <div className="group">
                            <label htmlFor="name">User ID</label>
                            <input type="text" name="name" id ="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
                        </div>
                        <div className="group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name= "email" id = "email" onChange={e => setDetails({...details,email: e.target.value})} value={details.email}/>
                        </div>
                        <div className="group">
                            <label htmlFor="password">Password</label>
                            <input type="text" name= "password" id = "password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                        </div>
                        
                    
                </div>
                
                <button id="button" type="submit" value="LOGIN" onClick={e=>{for(var i=0; i < user.length; i++){
                if(details.name === user[i].userId )
                {
                userLogin(details,user[i]);  
                } 
                }
                }}  >LOGIN</button>
                { (error!=="") ? (<div className="error">{error}</div>) :""}
            </form>
            
        </div>

        
    )
}


export default Login
