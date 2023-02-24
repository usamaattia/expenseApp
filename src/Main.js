import { Component } from 'react';
import firebase from './components/firestore';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            email:"",
            password:"",
            inEmail:"",
            inPassword:"",
            Loginn:"",
            error:""
        };
 
    }
    fetchEmp=async()=>{
  
        const response=db.collection("user").doc("user");
        const data=await response.get();
        this.email = data.data().email;
        this.password = data.data().password;
        //setEmp({...emp, emaill: data.data().email, passwordd: data.data().password})
        console.log("pspspsp")
    }

    getEle(){
         this.Loginn = details => {
            console.log(details);
            if (details.email=== adminUser.email && details.password=== adminUser.password){
              console.log("this is the admin account");
              setUser({
                name: details.name,
                email : details.email,
                password :details.password,
              })
                
            }
            else if (details.email=== empUser.email && details.password===empUser.password){
              console.log("emp")
              setUser({
                name: details.name,
                email : details.email
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
    }

    render() { 
        return ( 
            <div className="App">

                {(user.email!="") ? ((user.email==adminUser.email)? (<Admin Logout={Logout}/>):(<Emp Logout={Logout}/>)):<Login Loginn={Loginn} error={error}/>}     
      
            </div>
         );
    }
    
}
 
export default Main;
