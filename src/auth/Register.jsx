import React, { useState } from "react";
import { Button, FloatingLabel, Form, Modal, Alert } from "react-bootstrap";
import google from '../assets/image/google.svg';
import fb from '../assets/image/fb.svg';

import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";

const RegisterForm = ({ show, setShow, setShowLogin }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const handleClose = () => setShow(false);
  const changeModal = () => {
    handleClose();
    setShowLogin(true);
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  
  const { email, password, name } = form;

  function handleOnChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type' : 'application/json',
        },
      };

      const body = JSON.stringify(form)
      const response = await API.post("/register",body,config);

      if (response.data.code === 200){
        const alert = (
          <Alert variant="success" className="py-1">
            Registration Success
          </Alert>
        );
        setMessage(alert);
        setForm({
          name: '',
          email: '',
          password: '',
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Registration Failed
          </Alert>
        );
        setMessage(alert);
      }

      setShow(false)
      setShowLogin(true)

    } catch (error){
      <Alert variant="danger" className="py-1">
            Failed
      </Alert>
      setMessage(alert)
      console.log(error)
    }
  })
   
    // getUser();

    // let loggedIn = dataUser.filter(
    //   (element) => element.email === userRegister.email
    // );
    // if (loggedIn.length !== 0) {
    //   return alert("Email sudah terdaftar");
    // } else {
    //   createUser();
    //   changeModal();
    // }
  

  // const getUser = () => {
  //   if (typeof Storage === "undefined") {
  //     alert("Tidak bisa menambahkan pengguna");
  //   }

  //   const localData = localStorage.getItem("DATA_USER");
  //   let data = JSON.parse(localData);

  //   if (data !== null) {
  //     for (let i = 0; i < data.length; i++) {
  //       dataUser.push(data[i]);
  //     }
  //   }
  // };

  // const createUser = () => {
  //   userRegister.id = dataUser.length;
  //   dataUser.push(userRegister);
  //   const parsed = JSON.stringify(dataUser);
  //   localStorage.setItem("DATA_USER", parsed);
  // };

  return (
    <Modal show={show} onHide={handleClose} style={{marginTop:"4%"}}>
        
      <Form className="p-5" onSubmit={(e) => handleOnSubmit.mutate(e)} >
        <h2 className="text-left fw-bold text-danger mb-4">Register</h2>
        {message && message}
        <Form.Group className="my-3">
          <FloatingLabel label="Your name">
            <Form.Control
              type="text"
              placeholder="Your Name"
              name="name"
              value={name}
              onChange={handleOnChange}
              required
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Email address">
            <Form.Control
              type="email"
              placeholder="yourname@example.com"
              name="email"
              value={email}
              onChange={handleOnChange}
              required
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleOnChange}
              required
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <Button
            className="btn-auth btn btn-danger btn-main btn-form col-12"
            type="submit"
          >
            Register
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
            Already have an account ? Click{" "}
            <span className="fw-bold cursor-pointer" onClick={changeModal}>
              Here
            </span>
          </p>
        </Form.Group>
      </Form>
    </Modal>
  );
};

export default RegisterForm;