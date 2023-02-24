import React,{useState,useEffect} from 'react';
import firebase from './firestore'


function Manager() {
    const [blogs,setBlogs]=useState([]);
    const [appr,setAppr] = useState({name:"",boo:"true"});
    const db = firebase.firestore().collection("claimForm");
    console.log(db)
    function getCliam(){
       db.onSnapshot((querySnapshot)=>{
           const items = [];
            querySnapshot.forEach((doc)=>{
            items.push(doc.data());
            });
        setBlogs(items);
    }) 
    }
    useEffect(()=>{
        getCliam();
    },[]);

    const handle = e=>{
        const datab = firebase.firestore();
        const dataRef = datab.collection("claimForm").doc(appr.name).set({status:true});
    }

    //const [stat,setStat] = useState([])
    // console.log(stat);
    return (
        
        <div>
            <h1>Requests: </h1>

            
            
            {
                
                
                blogs.map((claim)=>(
                    
                    <div key={claim.name}>
                        <form onSubmit={handle}>
                        <h2>{claim.name} is requesting for:</h2>
                        <h2>{claim.title}</h2>
                        <p>{claim.amount} {claim.curr}</p>
                        <p>{claim.description}</p>  
                        {claim.status = "true"}  
                        
                        
                        <button type="submit" name="approve" value={appr.boo} onClick={e=>claim.status="true"} >Approve</button>

                            
                        </form>                
                    </div>
                ))
                
            }
            
        </div>
    )
}

export default Manager
