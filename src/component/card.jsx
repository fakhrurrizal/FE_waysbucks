import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import landing from "../assets/image/landing.png";



export default function Card() {
    return (
        <>
             <div className= 'cardHome px-5 pt-3 position-relative'>
                <div className='position-absolute top-0 start-0 px-5 rounded' style={{width:"75%",height:'470px', marginLeft:"10%", marginTop:"1%", backgroundColor:"#BD0707"}} >
                <img className='position-absolute rounded' style={{marginTop:"45px", marginLeft:"60%", width:"500px"}} src= { landing }/>
                <p className='h1 fw-bold text-white'style={{fontSize:"50px", marginTop:"50px"}}>WAYSBUCKS</p>
                <p className='text-white' style={{fontSize:"24px", paddingTop:"3%"}}>Things are changing, but we’re still here for you</p>
                <p className='text-white' style={{fontSize:"18px", width:500, paddingTop:"3%"}}> We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open. Waysbucks Drivers is also available</p>
                <p className='text-white' style={{fontSize:"24px", marginTop:"3%"}}>Let's Order ...</p>
                </div>
                </div>
        </>
    )
}
