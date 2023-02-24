import React,{ useState, useEffect } from 'react';
import Admin from "./components/Admin";
import Emp from "./components/Emp";
import Login from "./components/Login";
import firebase from './components/firestore';
import Manager from './components/Manager'
//mport './components/Login.css'



function App() {

  

  const [user, setUser] = useState({name:"",email:"",password:"",pos:""});
  
  const [error, setError] = useState("");
  const [emp,setEmp]=useState({emaill:"", passwordd:""});
  
  
  const [admin,setAdmin]=useState({emaill:"", passwordd:""});
  const [pos,setPos] = useState("");
  

  const db = firebase.firestore();
  
  const fetchAdmin=async()=>{
  
    const response=db.collection("admin").doc("admin");
    const data=await response.get();

    setAdmin({...admin, emaill: data.data().email, passwordd: data.data().password})
   
  }
  
  useEffect( e => {
    fetchAdmin();
  }, []);

  



  const adminUser = {
    email:admin.emaill,
    password:admin.passwordd
  }

  const userLogin = (details, userLog) =>  {
    // console.log(details,  userLog);
    
    setEmp({...emp, emaill: userLog.email, passwordd: userLog.password})
    setPos(userLog.pos)
  }

    
  const empUser = {
    
    email: emp.emaill,
    password: emp.passwordd
  }
    
  const Loginn = details => {
    //console.log(details);
    if (details.email=== adminUser.email && details.password=== adminUser.password){
      console.log("this is the admin account");
      setUser({
        name: details.name,
        email : details.email,
        password :details.password,
      })
        
    }
    else if (details.email === empUser.email && details.password === empUser.password){
      console.log("emp")
    
      setUser({
        name: details.name,
        email : details.email,
        pos:pos
      });

    }
    else{
      console.log("details dont match");
      setError("The information you provided is incorrect");
    }
  }

  
  const Logout = () => {
    setUser({name:"",email:""})
  } 


  return (
    <div className="App">
      {(user.email!=="") ? ((user.email===adminUser.email)? (<Admin Logout={Logout}/>):((user.pos==="Manager")?(<Manager />):(<Emp Logout={Logout} name={user.name}/>))):<Login Loginn={Loginn} error={error} userLogin={userLogin}/>}
    </div>
  )
}


export default App