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

  const [idDelete, setIdDelete] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showLogin, setShowLogin] = useState(true)
  const [showRegister, setShowRegister] = useState(false)


  const [state] = useContext(UserContext)
  const navigate = useNavigate();
  
  const { data: order, refetch } = useQuery("orderCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    }
    const res = await API.get("/orders", config);
    return res.data.data;
  });

  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })

  console.log("data order", order)
  const pay = []
  const [DataPay, setDataPay] = useState({
    name: "",
    email: "",
    phone: "",
    postcode: "",
    address: "",
  })

  
  const addDataPay = JSON.parse(localStorage.getItem("DATA_PAY"))
  const handleOnChange = (e) => {
    setDataPay({
      ...DataPay,
      [e.target.name]: e.target.value,
    })
  }

  const handleDelete = (id) => {
    setIdDelete(id)
    handleShow()
  }

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

  const deleteById = useMutation(async (id) => {
    try{
      const config = {
        method: "DELETE",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      }
      await API.delete(`/order/` + id, config)
      refetch()
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  })
 
  const dataOrder = order?.filter((item)=>{
    return item.transaction_id === null
  })

  console.log(dataOrder)

  let resultTotal = dataOrder?.reduce((addition, b) => {
    return addition + b.price
  },0);

  useEffect(() => {
    if (confirmDelete){
      handleClose()
      deleteById.mutate(idDelete)
      setConfirmDelete(null)
    }
  }, [confirmDelete])


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
                        {formatIDR.format(data?.price)}
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
                    {!!order === false || order.length === 0 ? 0
                    : formatIDR.format(
                      order
                      .map((e) => e.price)
                      .reduce((a, b) => a+b)
                    )}</p>
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
                    {!!order === false || order.length === 0 ? 0
                    : formatIDR.format(
                      order
                      .map((e) => e.price)
                      .reduce((a, b) => a+b)
                    )}
                    </p>
                  </Col>
                </Col>
              </Col>
            </Col>

            <Col xs={5} style={{marginTop:"7%"}}>
              <Form>
                <Form.Control
                  className="my-3"
                  placeholder="Name"
                  style={{
                    border: "1px solid #BD0707",
                    background: "#E0C8C840",
                    lineHeight: "2.5",
                  }} />
                <Form.Control
                  className="my-3"
                  placeholder="Email"
                  style={{
                    border: "1px solid #BD0707",
                    background: "#E0C8C840",
                    lineHeight: "2.5",
                  }} />
                <Form.Control
                  className="my-3"
                  placeholder="Phone"
                  style={{
                    border: "1px solid #BD0707",
                    background: "#E0C8C840",
                    lineHeight: "2.5",
                  }} />
                <Form.Control
                  className="my-3"
                  placeholder="Pos Code"
                  style={{
                    border: "1px solid #BD0707",
                    background: "#E0C8C840",
                    lineHeight: "2.5",
                  }} />
                <Form.Control
                  className="my-3"
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
                >
                  Pay
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