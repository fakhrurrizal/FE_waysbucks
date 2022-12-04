import "bootstrap/dist/css/bootstrap.min.css"
import React, { useContext, useState } from "react"

import {
  Button,
  Container,
  Nav,
  Navbar,
  OverlayTrigger,
  Popover,
  Stack,
  Badge,
} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../Contexts/userContext"
import AddProduct from "../assets/image/addProduct.svg"
import AddToping from "../assets/image/addTopping.svg"
import Basket from "../assets/image/cart.svg"
import Image from "../assets/image/logo.svg"
import users from "../assets/image/users.svg"
import Logout from "../assets/image/logoutIcon.svg"
import profile from "../assets/image/profile.svg"
import Login from "../auth/Login"
import Register from "../auth/Register"
import { useQuery } from "react-query"
import { API } from "../config/api"

function DropdownUser() {

  let navigate = useNavigate()

  const [state, dispatch] = useContext(UserContext)
  console.log(state.isLogin)
  const logout = () => {
    dispatch({
      type: "LOGOUT",
    })
    navigate("/")
    // localStorage.removeItem("VALUE_LOGIN")
    // window.location.reload()
  }

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom-end"
      overlay={
        <Popover id="popover-basic">
          <Popover.Body>
            <Nav.Link
              href="/profile"
              style={{
                fontWeight: "600",
                fontSize: "17px",
                alignItems: "center",
              }}
            >
              <img
                alt=""
                src={profile}
                style={{ width: "30px", marginRight: "15px" }}
              />
              Profile
            </Nav.Link>
          </Popover.Body>
          <hr />
          <Popover.Body>
            <Nav.Link
              onClick={logout}
              style={{
                fontWeight: "600",
                fontSize: "17px",
                alignItems: "center",
              }}
            >
              <img
                alt=""
                src={Logout}
                style={{ width: "30px", marginRight: "15px" }}
              />{" "}
              Logout
            </Nav.Link>
          </Popover.Body>
        </Popover>
      }
      style={{
        width: "70px",
        heigth: "70px",
      }}
    >
      <img
        alt=""
        src={users}
        className="d-inline-block align-top btn p-0 m-auto"
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid #bd0707",
        }}
      />
    </OverlayTrigger>
  )
}

function DropdownAdmin() {

  let navigate = useNavigate()

  const [state, dispatch] = useContext(UserContext)
  console.log(state.isLogin)
  const logout = () => {
    dispatch({
      type: "LOGOUT",
    })
    navigate("/")

  }

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom-end"
      overlay={
        <Popover id="popover-basic">
          <Popover.Body>
            <Nav.Link
              href="/AddProduct"
              className="mt-2"
              style={{
                fontWeight: "600",
                fontSize: "17px",
                alignItems: "center",
              }}
            >
              <img
                alt=""
                src={AddProduct}
                style={{ width: "30px", marginRight: "15px" }}
              />
              Add Product
            </Nav.Link>
            <Nav.Link
              href="/AddTopping"
              className="mt-4"
              style={{
                fontWeight: "600",
                fontSize: "17px",
                alignItems: "center",
              }}
            >
              <img
                alt=""
                src={AddToping}
                style={{ width: "30px", marginRight: "15px" }}
              />{" "}
              Add Toping
            </Nav.Link>
            <Nav.Link
              href="/ProductAdmin"
              className="mt-4"
              style={{
                fontWeight: "600",
                fontSize: "17px",
                alignItems: "center",
              }}
            >
              <img
                alt=""
                src={AddProduct}
                style={{ width: "30px", marginRight: "15px" }}
              />{" "}
              Product List
            </Nav.Link>
            <Nav.Link
              href="/TopingAdmin"
              className="mt-4"
              style={{
                fontWeight: "600",
                fontSize: "17px",
                alignItems: "center",
              }}
            >
              <img
                alt=""
                src={AddToping}
                style={{ width: "30px", marginRight: "15px" }}
              />{" "}
              Topping List
            </Nav.Link>
          </Popover.Body>
          <hr />
          <Popover.Body>
            <Nav.Link
              style={{
                fontWeight: "600",
                fontSize: "17px",
                alignItems: "center",
              }}
              onClick={logout}
            >
              <img
                alt=""
                src={Logout}
                style={{ width: "30px", marginRight: "15px" }}
              />{" "}
              Logout
            </Nav.Link>
          </Popover.Body>
        </Popover>
      }
    >
      <img
        alt=""
        src={users}
        className="d-inline-block align-top btn p-0 m-auto "
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid #bd0707",
        }}
      />
    </OverlayTrigger>
  )
}

function Navs() {
  const [state] = useContext(UserContext)
  console.log("ini isi dari", state)

  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const { data: order } = useQuery("ordersCache", async () => {
    const response = await API.get("/orders")
    return response.data.data
  })

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">
          {state.isLogin === false ? (
            <Nav.Link href="/">
              <img
                alt=""
                src={Image}
                width="60"
                height="60"
                className="d-inline-block align-top"
              />
            </Nav.Link>
          ) : state.user.role === "admin" ? (
            <Nav.Link href="/Admin">
              <img
                alt=""
                src={Image}
                width="60"
                height="60"
                className="d-inline-block align-top"
              />
            </Nav.Link>
          ) : (
            <Nav.Link href="/">
              <img
                alt=""
                src={Image}
                width="60"
                height="60"
                className="d-inline-block align-top"
              />
            </Nav.Link>
          )}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end gap-3"
        >
          <Nav className="me-auto"></Nav>
          <Nav>
            {state.isLogin === false ? (
              <>
                <Button
                  className="px-5 me-4"
                  size="sm"
                  variant="outline-danger"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </Button>
                <Button
                  className="px-5 "
                  size="sm"
                  variant="danger"
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </Button>

                <Login
                  show={showLogin}
                  setShow={setShowLogin}
                  setShowRegister={setShowRegister}
                />
                <Register
                  show={showRegister}
                  setShow={setShowRegister}
                  setShowLogin={setShowLogin}
                />
              </>
            ) : (
              <>
                {state.user.role === "admin" ? (
                  // Navbar Admin
                  <DropdownAdmin />
                ) : (
                  // Navbar User
                  <Stack direction="horizontal">
                    <Nav.Link href="/cart" className="position-relative m-3">
                      <img
                        alt=""
                        src={Basket}
                        width="35"
                        height="30"
                        className="d-inline-block align-top"
                      />
                      {order?.length >= 1 && (
                        <Badge
                          // style={{ top: "10%", left: "65%" }}
                          className="position-absolute translate-middle badge-position rounded-pill bg-danger p-1   border border-light rounded-circle"
                        >
                          {order?.length}
                        </Badge>
                      )}
                    </Nav.Link>
                    <DropdownUser
                    // userDropdown={userDropdown} logOut={logOut}
                    />
                  </Stack>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navs






