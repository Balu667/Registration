import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export const Auth = ({setUser}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [login, setLogin] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [img, setImg] = useState(null);
  const navigate = useNavigate();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      userName,
      password,
      image:img
    };
    console.log(JSON.stringify(userData),"json")
    console.log(userData, "user data",);

    if(login){

     
      try{
        const loginData  = {
          userName,
          password
        }
        const response =  await fetch("http://localhost:4000/api/login",{
             method:"POST",
             headers:{ 'Content-Type': 'application/json' },
             body: JSON.stringify(loginData),
         });
         const data =await response.json();
         setUser(data.user);
         navigate("/home")
         console.log(data,"response data");
     }catch(err){
        alert("username and password incorrect, Please check")
         console.log(err);
     }

    }else{
    
      try{
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("userName", userName);
        formData.append("password", password);
        formData.append("image", img);

        const response =  await fetch("http://localhost:4000/api/signup",{
             method:"POST",
            //  headers:{ 'Content-Type': 'application/json' },
             body: formData,
         });
         const data = await response.json();
         alert(data.message);
         setLogin(true)
         console.log(data,"response data")
     }catch(err){
         console.log(err);
     }
    }
   
    setFirstName("");
    setLastName("");
    setUserName("");
    setPassword("");
  };

  const switchModeHandler = () => {
    setLogin(!login);
  };

  
  return (
    <div className="auth-container">
      <h1>{!login ? "Register" : "Login"}</h1>
      <form onSubmit={formSubmitHandler}>
        {!login && <label>First Name</label>}
        {!login && (
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
          />
        )}
        {!login && <label>Last Name</label>}
        {!login && (
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
          />
        )}
        <label>User Name</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
        />
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
        />
        {!login && (
          <div className="photo">
            {imgUrl ? (
              <img src={imgUrl} alt="preview-img" className="preview-image" />
            ) : (
              "Please Pick a Image"
            )}
          </div>
        )}
        {!login && (
          <input
            onChange={(e) => {
              setImg(e.target.files[0]);
              const fileReader = new FileReader();
              fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                  setImgUrl(fileReader.result);
                }
              };
              fileReader.readAsDataURL(e.target.files[0]);
            }}
            accept=".png, .jpg, .jpeg"
            type="file"
            className="photo-input"
          />
        )}
        <button disabled={!login ? !firstName || !lastName || !password || !userName: !userName || !password} type="submit">{login ? "Login" : "Register"}</button>
        {!login ? <span>Already Customer? <a href="#" onClick={switchModeHandler}>Please Login</a></span>: <span>Already Customer? <a href="#" onClick={switchModeHandler}>Please Register</a></span>}
      </form>
    </div>
  );
};
