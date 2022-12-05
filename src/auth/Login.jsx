import React, { useContext, useState } from "react";
import { Button, FloatingLabel, Form, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import { useMutation } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../Contexts/userContext";

import google from '../assets/image/google.svg';
import fb from '../assets/image/fb.svg';

const LoginForm = ({ show, setShow, setShowRegister }) => {
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [state, dispatch] = useContext(UserContext);

  const handleClose = () => setShow(false);
  const changeModal = () => {
    handleClose();
    setShowRegister(true);
  };

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleOnChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const handleOnSubmit = useMutation(async(e) =>{
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type' : 'application/json',
        },
      };

      const body = JSON.stringify(form)
      const response = await API.post("/login",body,config);

      if (response.data.code === 200){
        //send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
        
        //status check

        if (response.data.data.role === "admin"){
          navigate("/admin");
          window.location.reload()
        }else {
        
          window.location.reload()
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login Success
          </Alert>
        );
        setMessage(alert);
      } 
    } catch (error){
      <Alert variant="danger" className="py-1">
            Failed
      </Alert>
      setMessage(alert)
      console.log(error)
    }
  });
  return (
    <Modal show={show} onHide={handleClose} style={{marginTop:"6%"}}>
      <Form className="p-5 " onSubmit={(e) => handleOnSubmit.mutate(e)}>
        <h2 className="text-left text-danger fw-bold color-red mb-4">Login</h2>
        {message && message}
        <Form.Group className="my-3">
          <FloatingLabel label="Email address">
            <Form.Control
              type="email"
              placeholder="yourname@example.com"
              name="email"
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <Button
            className="btnRegister btn btn-danger btn-main btn-form col-12"
            type="submit"
          >
            Login
          </Button>
        </Form.Group>
        <div style={{ display: 'flex', marginTop: '15px', justifyContent: 'center'}}>
              <div style={{width: '45%',marginTop: '-4px'}}><hr/></div>
              <p className="ms-2 me-2">or</p>
              <div style={{width: '45%',marginTop: '-4px'}}><hr/></div>
            </div>
        <div className="logoAuth d-flex justify-content-center ms-4 mb-4">
              <div>
                <img 
                  src={google}
                  width="30"
                  className="mt-2"
                  alt="Google"
                />
              </div>
              <div>
                <img 
                  src={fb}
                  width="70"
                  className="btnFb ms-3"
                  alt="Facebook"
                />
              </div>

            </div>
            
        <Form.Group>
          <p className="text-center my-3">
            Don't have an account? Click{" "}
            <span className="fw-bold cursor-pointer" onClick={() => {
              setShow(false)
              setShowRegister(true)
            }}>
              Here
            </span>
          </p>
        </Form.Group>
      </Form>
    </Modal>
  );
};

export default LoginForm;