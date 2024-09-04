import React, { useEffect, useState } from 'react';
// import "../dist/output.css";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const Input = () => {
  const [dataTeks,setDataTeks] = useState([]);
  const [inputTeks,setInputTeks] = useState("");
  const [load,setLoad] = useState(true);
  const [EditItem,setEditItem] = useState(null);
  const [updateTeks,setUpdateTeks] = useState("");
  const navigate = useNavigate();

  const getData = async () => {
    try{
      // //1.Ambil token dari local storage
      const token = localStorage.getItem("nama-token");
      if(!token){
        console.error("token tidak ditemukan");
        setLoad(false);
        return ;
      }

      //set header dengan token
      const config = {
        headers : {'nama-token' : token}
      }

      const res = await axios.get("http://localhost:3001/input/inputTeks",config)      
      setDataTeks(res.data);
      console.log("DATA : ",res.data)
      setLoad(false);
    
    }catch(err){
      setLoad(true);
      console.log("Errornya : ",err)
    }
  } 
  
  
  const postData = async () => {
    try{
       //1.Ambil token dari local storage
       const token = localStorage.getItem("nama-token");
       if(!token){
         console.error("token tidak ditemukan");
         setLoad(false);
         return ;
       }
 
       //set header dengan token
       const config = {
         headers : {'nama-token' : token}
       }

      const data = {
        tasks : [
          {
            teks : inputTeks,
          }
        ]
      }
      await axios.post("http://localhost:3001/input/inputTeks",data,config);
      getData();
      setInputTeks("");
    }catch(err){
      setLoad(true);
      console.log(err)
    }
  }

  const deletData = async(id) => {
    try{
       await axios.delete("http://localhost:3001/input/inputTeks/" + id);
      getData();
    }catch(err){
      console.log(err)
    }
  }

  const patchChecbox = async(id,checked) => {
    try{
       //1.Ambil token dari local storage
       const token = localStorage.getItem("nama-token");
       if(!token){
         console.error("token tidak ditemukan");
         setLoad(false);
         return ;
       }
 
       //set header dengan token
       const config = {
         headers : {'nama-token' : token}
       }

       
      const updateCheckbox = {
        tasks : [
          {
            checkbox : checked
          }
        ]
      }

      const patchh = await axios.patch("http://localhost:3001/input/inputTeks/" + id,updateCheckbox,config)
      console.log(patchh)
      getData();
    }catch(err){
      console.log(err);
    }
  }

  const tombolEdit = (id,teks) => {
    setEditItem(id);
    setUpdateTeks(teks);
    console.log("Id : " , id, "\nBernilai : ",EditItem);
  
  }

  const updateData = async(id,teks) => {
    const newTeks = {
      teks : updateTeks
    }
    await axios.patch("http://localhost:3001/input/inputTeks/" + id,newTeks);
   getData();
   setEditItem(null)
  }

  const batalEdit = () => {
    setEditItem(null);
  }

  const Logout = () => {
    localStorage.removeItem("nama-token");
    navigate("/login")
  }

  useEffect(() => {
    getData();
  },[])

  if(load){
    return <p>Loading...</p>
  }

  return (
      <div>
        <Link to="/input2Radio">Radio </Link>
        <button className=' bg-red-400 px-3 py-2 mt-3 hover:bg-red-500 hover:text-white' onClick={Logout}> Logout</button>
        <h1 className=' text-xl m-4 border-2 border-black p-2'>1. Input Teks</h1>
        <div className=' bg-orange-100 pb-5 mx-3'>
          <div class="mt-5 p-3 flex justify-around">
            <input type="text" name="input" placeholder='Masukan...' id="input" className='px-2 py-1 w-5/6' value={inputTeks} onChange={(e) => setInputTeks(e.target.value)} />
            <button className=' bg-green-400 px-5 hover:bg-green-500' onClick={postData}>Kirim</button>
          </div>

            <div class=" mx-auto w-28">
              <input type="checkbox" name="" id=""  />
              <span className='ml-3'>Select All</span>
            </div>


            {dataTeks.map(dt => (
                <div class=" bg-blue-200 flex justify-between px-5 mt-3 py-2 mx-3 items-center" key={dt._id}>

                
                <div className=' flex w-4 mr-2 items-center'>
                    <input type="checkbox" name="" id="" className=' mt-1' checked={dt.checkbox}  onChange={(e) => patchChecbox(dt._id,e.target.checked)}/>
                  </div>

                {EditItem === dt._id ?  
                <div className="  w-full flex justify-between">
                    <div className=' mt-2 '>
                      <input type="text" name="" id="" value={updateTeks} onChange={(e) => setUpdateTeks(e.target.value)} />
                    </div>

                    <div className=' w-2/12 flex justify-evenly'>
                      <button className="px-5 py-1 h-10 bg-gray-200 cursor-pointer hover:bg-gray-300" onClick={ batalEdit}>Batal</button>

                      <button className="px-5 py-1 h-10 bg-green-300 cursor-pointer hover:bg-green-400" onClick={() => updateData(dt._id,dt.teks)}>Simpan</button>
                    </div>
                  </div> : 
                   <div className="  w-full flex justify-between">
                   <div className=' mt-2 '>
                     <p className=' ml-3'>{dt.teks}</p>
                   </div>

                   <div className=' w-2/12 flex justify-evenly'>
                     <button className={`px-5 py-1 h-10 ${dt.checkbox ? 'bg-gray-300 cursor-pointer' : 'bg-gray-100 text-gray-400'}`} disabled={!dt.checkbox} onClick={() => tombolEdit(dt._id,dt.teks)}>Edit</button>

                     <button className={` px-5 py-1 h-10 ${dt.checkbox ? 'bg-red-300 cursor-pointer' : 'bg-red-200 text-gray-400'}`} onClick={(e) => deletData(dt._id)} disabled={!dt.checkbox}>Hapus</button>
                   </div>
                 </div>
                  }
                         
              </div>
            ))}

            

          </div>
        
       
      </div>
  );
};

export default Input;
