import React, { useContext, useEffect, useState} from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import trash from '../../assets/image/trash.svg';
import { API } from "../../config/api";
import { useQuery, useMutation } from "react-query";
import Login from "../../auth/Login"
import Register from "../../auth/Register"
import { UserContext } from "../../Contexts/userContext"
import DeleteData from "../../component/modal/DeleteData";


function CartUserPage() {

  const [state] = useContext(UserContext)

  let { data: order, refetch } = useQuery("ordersCache", async () => {
    const response = await API.get("/orders-id")
    return response.data.data
  })
  console.log("data order: ", order)

  let Subtotal = 0
  let Qty = 0
  let IDTrans = 0
  if (state.isLogin === true) {
    order?.map(
      (element) => (
        (Subtotal += element.subtotal),
        (Qty += element.qty),
        (IDTrans = element.transaction_id)
      )
    )
  }

  //Payment
  const [DataPay, setState] = useState({
    name: "",
    email: "",
    phone: "",
    postcode: "",
    address: "",
  })

  // const { name, address } = form

  const handleOnChange = (e) => {
    setState({
      ...DataPay,
      [e.target.name]: e.target.value,
    })
  }

  let navigate = useNavigate()

  const HandlePay = useMutation(async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }
      const requestBody = JSON.stringify(DataPay)
      const response = await API.patch(
        "/updatetrans/" + IDTrans,
        requestBody,
        config
       
      )
      // navigate("/profile");
      console.log("Transaksi", response)
      const snapToken = await API.get(`/midtrans/`+ IDTrans)

    const token = snapToken.data.data.token;

    window.snap.pay(token, {
      onSuccess: function (result) {
        /* You may add your own implementation here */

        console.log(result);
        navigate("/profile");
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        navigate("/profile");
      },
      onError: function (result) {
        /* You may add your own implementation here */
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
      },
    });
    } catch (error) {
      console.log(error)
    }
  })

  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })

  const [showLogin, setShowLogin] = useState(true)
  const [showRegister, setShowRegister] = useState(false)
  const [modalShow, setModalShow] = useState(false)

  //Delete order
  const [idDelete, setIdDelete] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleDelete = (id) => {
    setIdDelete(id)
    handleShow()
  }

  const deleteById = useMutation(async (id) => {
    try {
      const config = {
        method: "DELETE",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      }
      await API.delete(`/order/${id}`, config)
      refetch()
    } catch (error) {
      console.log(error)
    }
  })
  

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    const myMidtransClientKey = "Mid-client-2PsqiscjRulJw8KN";
    // const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
    // if (confirmDelete) {
    //   // Close modal delete data
    //   handleClose()
    //   // execute delete data by id function
    //   deleteById.mutate(idDelete)
    //   setConfirmDelete(null)
    // }
    
  }, []);
 

return (
    <>
       {state.isLogin === false? (
        <>
          <Login 
            show={showLogin}
            onHide={() => setShowLogin(false)}
            setShowLogin={setShowLogin}
            setShowRegister={setShowRegister}
          />

          <Register 
            show={showRegister}
            onHide={() => setShowRegister(false)}
            setShowLogin={setShowLogin}
            setShowRegister={setShowRegister}
          />
        </>
       ): (
        <><Container className="my-3 text-danger">
          <Row>
            <Col xs={7} className="d-flex flex-column gap-3">
              <Col xs={12}>
                <h2 className="fw-bold color-red">My Cart</h2>
              </Col>
              <Col>
                <p className="color-red fs-5">Review Your Order</p>
                <hr style={{ width: "100%" }} />
              </Col>
              <Col>
                {order?.map((data, index) => (
                  <Col
                    key={index}
                    className="col-12 my-1 d-flex flex-row align-items-start"
                  >
                    <Col xs={2}>
                      <img
                        src={data?.product?.image}
                        alt=""
                        className="cartlist-image rounded" />
                    </Col>
                    <Col xs={8}>
                      <h6 className="fw-bold color-red">
                        {data?.product?.title}
                      </h6>
                      <p className="color-red fs-7">
                        <strong>Toppings: </strong>{" "}
                        {data.toppings?.map((data) => (
                          <>{data.title},</>
                        ))}
                      </p>
                    </Col>
                    <Col
                      xs={2}
                      className="d-flex flex-column gap-1 align-items-center"
                    >
                      <p className="color-red fs-6 my-0">
                        {formatIDR.format(data?.subtotal)}
                      </p>
                      <img
                        src={trash}
                        onClick={() => handleDelete(data?.id)}
                        style={{ cursor: "pointer" }} />
                    </Col>
                  </Col>
                ))}
              </Col>
              <Col>
                <hr style={{ width: "100%" }} />
                <Col xs={6} className="d-flex flex-row align-items-start">
                  <Col xs={6}>
                    <hr style={{ width: "100%" }} />
                    <p className="color-red fs-6">Subtotal</p>
                    <p className="color-red fs-6">Qty</p>
                    <hr />
                  </Col>
                  <Col xs={6}>
                    <hr style={{ width: "100%" }} />
                    <p className="color-red fs-6 text-end">
                    {formatIDR.format(Subtotal)}</p>
                    <p className="color-red fs-6 text-end">{order?.length}</p>
                    <hr style={{ width: "100%" }} />
                  </Col>
                </Col>
                <Col xs={6} className="d-flex flex-row align-items-start">
                  <Col xs={6}>
                    <p className="color-red fs-6">Total</p>
                  </Col>
                  <Col xs={6}>
                    <p className="color-red fs-6 text-end">
                    {formatIDR.format(Subtotal)}
                    </p>
                  </Col>
                </Col>
              </Col>
            </Col>

            <Col xs={5} style={{marginTop:"7%"}}>
              <Form  onSubmit={(e) => HandlePay.mutate(e)}>
                <Form.Control onChange={handleOnChange}
                  className="my-3"
                  name="name"
                  placeholder="Name"
                  style={{
                    border: "1px solid #BD0707",
                    background: "#E0C8C840",
                    lineHeight: "2.5",
                  }} />
                <Form.Control onChange={handleOnChange}
                  className="my-3"
                  placeholder="Email"
                  name="email"
                  style={{
                    border: "1px solid #BD0707",
                    background: "#E0C8C840",
                    lineHeight: "2.5",
                  }} />
                <Form.Control onChange={handleOnChange}
                  className="my-3"
                  placeholder="Phone"
                  name="phone"
                  style={{
                    border: "1px solid #BD0707",
                    background: "#E0C8C840",
                    lineHeight: "2.5",
                  }} />
                <Form.Control onChange={handleOnChange}
                  className="my-3"
                  placeholder="Pos Code"
                  name="postcode"
                  style={{
                    border: "1px solid #BD0707",
                    background: "#E0C8C840",
                    lineHeight: "2.5",
                  }} />
                <Form.Control onChange={handleOnChange}
                  className="my-3"
                  name="address"
                  as="textarea"
                  placeholder="Your Address"
                  style={{
                    height: "150px",
                    border: "1px solid #BD0707",
                    background: "#E0C8C840",
                    lineHeight: "2.5",
                  }} />
                <Button
                  className="btn btn-danger btn-main btn-form col-12"
                  type="submit"
                >
                  Order {!!order === false || order.length === 0 ? 0
                    : formatIDR.format(
                      order
                      .map((e) => e.subtotal)
                      .reduce((a, b) => a+b)
                    )}
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
        <DeleteData
          setConfirmDelete={setConfirmDelete}
          show={show}
          handleClose={handleClose}
        />
        </> 
       )} 
       
    </>
  );
};

export default CartUserPage;