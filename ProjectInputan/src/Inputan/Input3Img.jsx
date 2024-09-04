import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../dist/output.css";

const Input3Img = () => {
  const [imgData,setImgData] = useState([]);
  const [selectFile,setSelectFile] = useState(null);
  const [editImg,setEditImg] = useState(null);
  const [editFile,setEditFile] = useState(null);
  const [load,setLoad] = useState(true)

  const getDataImg = async() => {
    try{

      //1.Ambil token dari localstorage
      const token = localStorage.getItem("nama-token");
      if(!token){
        console.error("Token tidak ditemukan")
        setLoad(false);
        return;
      }

      //set header
      const config = {
        headers : {'nama-token' : token}
      }

      const res = await axios.get("http://localhost:3001/inImg/dataImg",config);
      setImgData(res.data);
      console.log(res.data);
      setLoad(false);
    }catch(err){
      console.log(err)
        setLoad(true);
      
    }
  }

  const handleFileChange = (e) => {
    setSelectFile(e.target.files[0]);
  }

  const handleUpload = async() => {
    try{
      if(!selectFile) return;

      const formData = new FormData();
      formData.append('image',selectFile);

      await axios.post("http://localhost:3001/inImg/dataImg",formData);
      getDataImg();
      setSelectFile(null)
      document.getElementById("file-input").value = "";
    }catch(err){
      console.log(err)
    }
  }

  const delData = async(id) => {
    try{
      axios.delete("http://localhost:3001/inImg/dataImg/" + id);
      setImgData((prevData) => prevData.filter(img => img._id !== id))
    }catch(err){  
      console.log(err)
    }
  }
  
  //Handle file 
  const handleEditFileChange = (e) => {
    setEditFile(e.target.files[0]);
  }

  //Edit Image
  const handleEdit = async (id) => {
    if(!editFile) return;

    const formData = new FormData();
    formData.append("image",editFile);

    try{
      await axios.patch("http://localhost:3001/inImg/dataImg/" + id,formData);
      setEditFile(null);
      setEditImg(null);
      getDataImg();
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    console.log(selectFile)
  },[selectFile])

  useEffect(() => {
    getDataImg();
  },[])

  if(load) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1 className='border-2 border-black p-2 text-xl m-4'>3. Input Image </h1>
      <div className=' mt-4 mx-3 pb-5'>
          
          <div className='p-3 flex justify-evenly'>
            <input type="file" name="" id="file-input" onChange={handleFileChange}/>
            <button className=' bg-green-300 p-2 px-5 hover:bg-green-400' onClick={handleUpload}>Upload</button>
          </div>

          <div className='mx-auto flex w-28'>
            <input type="checkbox" name="" id="" />
            <span className='mx-3'>Select All</span>
          </div>


          {imgData.map(img => (
              <div class=" bg-blue-200 flex justify-between px-5 mt-3 py-2 mx-3" key={img._id}>
              <div className='flex w-1/4 items-center'>
                <input type="checkbox" name="" id="" className=' mt-1' />
                <img src={`http://localhost:3001/uploadDonk/${img.filename}`} alt="tes" className=' w-64 h-48 ml-3' />
              </div>

              <div class=" w-2/4 flex justify-around items-center">
                <input type='file' id={`file-input-${img._id}`} style={{ display : 'none' }}/>
                <input type="file" onChange={handleEditFileChange} />
                <button className=' bg-gray-200 px-5 py-1 h-10 hover:bg-gray-300' onClick={() => handleEdit(img._id)} >Edit</button>
                <button className='bg-red-200 px-5 py-1 h-10 hover:bg-red-300' onClick={() => delData(img._id)}>Hapus</button>
              </div>
            </div>
          ))}

        </div>
    </div>
  )
}

export default Input3Img
