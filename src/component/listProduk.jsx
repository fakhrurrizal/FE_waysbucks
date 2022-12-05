import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Row } from 'react-bootstrap'
import LoginForm from "../auth/Login";
import RegisterForm from "../auth/Register";
import { UserContext } from "../Contexts/userContext";
import { useQuery } from "react-query";
import { API } from "../config/api";


export default function Produk({ getLogin }){
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false)

    const toDetail = (id) => {
        navigate("/product/" + id)
    }
    const [state] = useContext(UserContext)
    const { data: products } = useQuery("productsCache", async() => {
        const res = await API.get("/products")
        return res.data.data
    })
    console.log("data product : ", products)

    return(
        <>  
            <p className='fw-bold' style={{color:"#BD0707", fontSize:"36px", marginLeft:"10%", marginTop:"43%"}}>Let's Order</p>    
               <Row xs="4" className="d-flex gap-2" style={{marginLeft:"9%"}}>
             
                {products?.map((data, index) => (
                    <Col  xs="4" className="mt-5" style={{ width:"19rem", height:"auto" }}>
                    <Card 

                        onClick={() => state.isLogin === false ? setShowLogin(true) : toDetail(data?.id)}
                        key={index}

                        style={{borderRadius:'14px', backgroundColor:"#F3CFC6", cursor:"pointer"}}>
                        <Card.Img variant="top" src={data?.image} style={{width:"100%"}} />
                        <Card.Body className="text-danger">
                            <div
                                style={{fontWeight:"Bold", fontSize:"20px"}}
                            >{data?.title}</div>
                            <Card.Text>
                            Rp. {data?.price}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
             </Row>
             <LoginForm 
                show={showLogin}
                setShow={setShowLogin}
                setShowRegister={setShowRegister}
             />
            <RegisterForm 
                show={showRegister}
                setShow={setShowRegister}
                setShowRegister={setShowLogin}
            />
        </>
    )
}