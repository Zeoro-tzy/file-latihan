// import RuteInput from "./Inputan/RuteInput";
import "./dist/output.css"
import {BrowserRouter as Router,Routes,Route, Navigate} from "react-router-dom"
import Loginn from "./logreg/Loginn";
import Register from "./logreg/Register";
import Input from "./Inputan/Input";
import Input2Radio from "./Inputan/Input2Radio";
import Input3Img from "./Inputan/Input3Img";
import RuteInput from "./Inputan/RuteInput";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn,setAmbilToken] = useState(localStorage.getItem("nama-token"));

  useEffect(() => {
    console.log("Isi Token : ",isLoggedIn)       
  },[isLoggedIn])


  return (
    <div>
      <Router>
        <Routes> 
           <Route path="/input" element= {isLoggedIn ? <Input /> : <Navigate to="/login"/>} /> 
           <Route path="/" element= {isLoggedIn ? <RuteInput />  : <Navigate to="/login"/>} /> 

           <Route path="/input2Radio" element={isLoggedIn ? <Input2Radio /> : <Navigate to="/login" />} />

           <Route path="/input3Img"  element={isLoggedIn ? <Input3Img /> : <Navigate to="/login" />} />

           <Route path="/login" element={<Loginn setAmbilToken={setAmbilToken} />}/>
           
           <Route path="/register" element={<Register />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
