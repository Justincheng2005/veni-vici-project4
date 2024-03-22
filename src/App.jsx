import { useState } from 'react'
import APIForm from './components/APIForm.jsx'
import BanDisplayList from './BanDisplayList.jsx';
import './App.css'

function App() {
  const API_KEY = import.meta.env.VITE_NASA_API_KEY;

  const [data, setData] = useState({
    sol: -1,
    cameraName: null,
    roverName: null,
    imageURL: null
  });
  const [banSol, setBanSol] = useState([]);
  const [banCamOnC, setBanCamOnC] = useState([]);
  const [banCamOnO, setBanCamOnO] = useState([]);
  const [banCamOnS, setBanCamOnS] = useState([]);
  const [banRovers, setBanRovers] = useState([]);

  //Add to ban list functions
  const addToBanSol = () => {
    setBanSol((prevState) => [...prevState, data.sol])
  }
  const addToBanCam = () => {
    if(data.roverName.localeCompare("curiosity") == 0){
      setBanCamOnC((prevState) => [...prevState, data.cameraName])
    }
    else if(data.roverName.localeCompare("opportunity") == 0){
      setBanCamOnO((prevState) => [...prevState, data.cameraName])
    }
    else if(data.roverName.localeCompare("spirit") == 0){
      setBanCamOnS((prevState) => [...prevState, data.cameraName])
    }  
  }
  const addToBanRovers = () => {
    setBanRovers((prevState) => [...prevState, data.roverName]);
  }

  const discoverNew = () => {
    //determines the rover 
    let rovers=["curiosity", "opportunity", "spirit"]
    for(let i=0;i<banRovers.length;i++){
      let index = rovers.indexOf(banRovers[i]);
      if(index != -1){
        rovers.splice(index,1);
      }
    }
    let chosenRover = rovers[Math.floor(Math.random() * rovers.length)];
    let maxSol=0;
    let unBannedCameras=[];
    if(chosenRover == null){
      alert("All rovers are banned, no new images can be shown");
    }
    else if(chosenRover.localeCompare("curiosity") == 0){
      //data for curiosity rover
      maxSol=4102;
      unBannedCameras=["FHAZ", "NAVCAM", "MAST", "CHEMCAM", "MAHLI", "MARDI", "RHAZ"];
      //remove all banned cameras on curiosity from unBannedCameras array
      for(let i=0;i<banCamOnC.length;i++){
        let index=unBannedCameras.indexOf(banCamOnC[i])
        if(index != -1){
          unBannedCameras.splice(index,1);
        }
      }
      if(unBannedCameras.length == 0){
        alert("All possible cameras on this rover are banned");
        setBanRovers((prevState) => [...prevState, "curiosity"]);
      }
      else{
        makeQuery(chosenRover, maxSol, unBannedCameras);
      }
    }
    else if(chosenRover.localeCompare("opportunity") == 0){
      //data for opportunity rover
      maxSol=5111;
      unBannedCameras=["FHAZ", "NAVCAM", "PANCAM", "MINITES", "ENTRY", "RHAZ"];
      //remove all banned cameras on opportunity from unBannedCameras array
      for(let i=0;i<banCamOnO.length;i++){
        let index = unBannedCameras.indexOf(banCamOnO[i])
        if(index != -1){
          unBannedCameras.splice(index,1);
        }
      }
      if(unBannedCameras.length==0){
        alert("All possible cameras on this rover are banned");
        setBanRovers((prevState) => [...prevState, "opportunity"]);
      }
      else{
        makeQuery(chosenRover, maxSol, unBannedCameras);
      }
    }
    else if(chosenRover.localeCompare("spirit") == 0){
      //data for spirit rover
      maxSol=2208
      unBannedCameras=["FHAZ", "NAVCAM", "PANCAM", "MINITES", "ENTRY", "RHAZ"];
      //remove all banned cameras on spirit from unBannedCameras array
      for(let i=0;i<banCamOnS.length;i++){
        let index = unBannedCameras.indexOf(banCamOnS[i])
        if(index != -1){
          unBannedCameras.splice(index,1);
        }
      }
      if(unBannedCameras.length==0){
        alert("All possible cameras on this rover are banned");
        setBanRovers((prevState) => [...prevState, "spirit"]);
      }
      else{
        makeQuery(chosenRover, maxSol,unBannedCameras);
      }
    }
  }

  const makeQuery = async(chosenRover, maxSol,cams) =>{
    let photoCol=[]
    //gets photos from random sol and 
    do{
      //gets random sol for the fetch
      let randSol=Math.floor(Math.random() * maxSol);
      while(banSol.indexOf(randSol) != -1){
        randSol=Math.floor(Math.random() * maxSol);
      }
      //fetch
      const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${chosenRover}/photos?sol=${randSol}&api_key=${API_KEY}`);
      const data = await response.json();
      //removes photos from banned cameras
      for(let i=0; i<data.photos.length; i++){
        if(cams.indexOf(data.photos[i].camera.name) == -1){
          data.photos.splice(i, 1);
          i--;
        }
      }
      photoCol=[...data.photos]
    }while(photoCol.length <= 0);
    let randPhoto = photoCol[Math.floor(Math.random() * (photoCol.length-1))];
    setData({
      sol: randPhoto.sol,
      cameraName: randPhoto.camera.name,
      roverName: randPhoto.rover.name.toLowerCase(),
      imageURL: randPhoto.img_src
    })
  }

  const removeBan = (type,val) => {
    if(type.localeCompare("sol") == 0){
      let newArray = banSol.filter(element => element != val);
      setBanSol(newArray);
      console.log(banSol);
    }
    else if(type.localeCompare("camC") == 0){
      let newArray = banCamOnC.filter(element => element != val);
      setBanCamOnC(newArray);
      console.log(banCamOnC);
    }
    else if(type.localeCompare("camO") == 0){
      let newArray = banCamOnO.filter(element => element != val);
      setBanCamOnO(newArray);
      console.log(banCamOnO);
    }
    else if(type.localeCompare("camS") == 0){
      let newArray = banCamOnS.filter(element => element != val);
      setBanCamOnS(newArray);
      console.log(banCamOnS);
    }
    else if(type.localeCompare("rov") == 0){
      let newArray = banRovers.filter(element => element != val);
      setBanRovers(newArray);
      console.log(banRovers);
    }
  }

  return (
    <div className='everything'>
      <div className='main-container'>
        <h2>
          Space Exploration
        </h2>
        <h4>Discover images taken of space</h4>
        <APIForm
          sol={data.sol}
          camName={data.cameraName}
          rovName={data.roverName}
          imgURL={data.imageURL}
          addBanToS={addToBanSol}
          addBanToC={addToBanCam}
          addBanToR={addToBanRovers}
          onSubmit={discoverNew}
        />
      </div>
      <div className='banlist-container'>
        <BanDisplayList 
          banSol={banSol}
          banCamOnC={banCamOnC}
          banCamOnO={banCamOnO}
          banCamOnS={banCamOnS}
          banRovers={banRovers}
          removeBan={removeBan}
        />
      </div>
    </div>
  )
}

export default App
