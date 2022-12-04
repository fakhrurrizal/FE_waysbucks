import React, { useContext, useState, useEffect } from 'react';
import { Col, Row, Container, Card,  Button } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import check from '../../assets/image/check.svg'
import { API } from '../../config/api';
import { UserContext } from '../../Contexts/userContext';

function DetailProduct() {

    const navigate = useNavigate();

    const [state] = useContext(UserContext)

    const { id } = useParams()

    const formatIDR = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency:"IDR",
      maximumFractionDigits:0,
    })

    let { data: productDetail } = useQuery("productdetailCache", async () => {
      const response = await API.get("/product/" + id)
      return response.data.data
    })

    let { data: toppings } = useQuery("toppingsCache", async () => {
      const response = await API.get("/toppings")
      return response.data.data
    })

  //Topping set
  const [toppingCheck, setToppingCheck] = useState([]);
  const [toppingPrice, setToppingPrice] = useState([]);

  function handleChecked (id, price){
    let idNow = toppingCheck.filter((e) => e === id)
    if (idNow[0] !== id){
      setToppingCheck([...toppingCheck, id])
      setToppingPrice(Number(toppingPrice) + Number(price))
    }else {
        setToppingCheck(toppingCheck.filter((e) => e !== id))
        setToppingPrice(Number(toppingPrice) - Number(price))
      }
    }

    let subTotal = productDetail?.price + toppingPrice

    const HandleAddCart = useMutation(async (e) => {
      try {
        e.preventDefault()

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        }

        const data = {
          qty: 1,
          subtotal: subTotal,
          product_id: productDetail.id,
          topping_id: toppingCheck,
        }

        const body = JSON.stringify(data)

        const response = await API.post("/order/" + productDetail.id, body, config)
        console.log("Respone Order :", response)
        navigate("/cart")
      } catch (error){
        console.log(error)
      }
    })


    useEffect(() => {
      if (state.isLogin === false || state.user.role === "admin"){
        navigate("/admin")
      }
    }, [state]);
    

  return (
   <>
        <Container>
            <Row className="my-3 text-danger mx-5">
                <Col className="col-4">
                    <img 
                        src={ productDetail?.image }
                        alt=""
                        className='image-product rounded-4'
                    />
                </Col>
                <Col className="col-8 d-flex flex-column gap-2">
                    <Col className="col-12">
                        <h1 className="text-danger fw-bold">{productDetail?.title}</h1>
                        <h5 className="text-danger fs-5 mb-5">
                           { formatIDR.format(productDetail?.price) }
                        </h5>
                    </Col>
                    <Col className="col-12">
                        <h4 className="fw-bold text-danger">Topping</h4>
                        <Row>
                            {toppings?.map((topping) => (
                                <Col className="col-12 col-md-3 my-1">
                                    <Card
                                        style={{border:"none"}}
                                        className="toppinglist-card me-2 ms-5 align-items-center position-relative"
                                        onClick={() =>
                                            handleChecked(topping?.id, topping?.price)
                                        }
                                    >
                                        <Card.Img 
                                            src={topping?.image}
                                            style={{width:"80px"}}
                                        />
                                        {toppingCheck.filter(
                                            element => element === topping?.id
                                        )[0] === topping?.id ? (
                                            <Card.Img src={check} className="checked" />
                                        ) : (
                                            <></>
                                        )}
                                        
                                        <Card.Body className="d-flex flex-column align-items-center p-1">
                                            <div className="card-title">
                                                {topping.title}
                                            </div>
                                            <Card.Subtitle className="fs-9">
                                                {formatIDR.format(topping?.price)}
                                            </Card.Subtitle>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col className="col-12">
                        <Row className="my-3">
                            <Col className="col-6">
                                <h3 className="fw-bold color-red">Total</h3>
                            </Col>
                            <Col className="col-6">
                                <h3 className="fw-bold color-red text-end">
                                    {formatIDR.format(subTotal)}
                                </h3>
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Button 
                                className="btn btn-danger btn-main btn-form col-12"
                                onClick={(e) => HandleAddCart.mutate(e)}
                            >
                                Add Cart
                            </Button>
                        </Row>
                    </Col>
                </Col>
                
            </Row>
        </Container>

   </>
  );
  }         
  

export default DetailProduct;
