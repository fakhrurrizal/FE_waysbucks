import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { API } from "../../config/api"

// import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';

const style = {
  textTitle: {
    fontWeight: "600",
    fontSize: "32px",
    lineHeight: "49px",
    textAlign: "left",
    width: "100%",
    color: "#BD0707",
  },

  textRed: {
    color: "#BD0707",
  },

  bgColor: {
    backgroundColor: "#BD0707",
  },

  textCenter: {
    textAlign: "center",
  },

  link: {
    fontWeight: "bold",
    textDecoration: "none",
    color: "black",
  },

  ImgProduct: {
    position: "relative",
    width: "350px",
  },

  // Image Product 1
  ImgLogo: {
    position: "absolute",
    width: "130px",
    height: "auto",
    top: "35%",
    left: "77%",
  },
}

function AddProduct() {
  // const [popUp, setPopUp] = React.useState(false)
  // const [photoProduct, setPhotoProduct] = React.useState(<p>Image Product</p>)
  const [preview, setPreview] = useState(null)
  const navigate = useNavigate();
  const [DataProduct, setDataProduct] = useState({
    title: "",
    price: 0,
    image: "",
  })

  
  const handleOnChange = (e) => {
    setDataProduct({
      ...DataProduct,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    })

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
      // setPhotoProduct(<p className="txt-black">{url}</p>)
    }
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()
      const formData = new FormData()
      formData.set("title", DataProduct.title)
      formData.set("price", DataProduct.price)
      formData.set(
        "image",
        DataProduct.image[0],
        DataProduct.image[0].nameproduct
      )

      // Insert product data
      const response = await API.post("/product", formData)
      console.log(response)

      navigate("/AddProduct")
    } catch (error) {

      
      console.log(error)
    }
  })


  return (
    <Container className="my-5">
      <Card className="mt-5" style={{ border: "white" }}>
        <Row>
          <Col sm={8}>
            <Card.Body className="m-auto" style={{ width: "80%" }}>
              <Card.Title className="mb-5" style={style.textTitle}>
                <strong>Add Product</strong>
              </Card.Title>
              <Form
                onSubmit={(e) => handleSubmit.mutate(e)}
                id="addProduct"
                className="m-auto mt-3 d-grid gap-2 w-100"
               
              >
                <Form.Group className="mb-3 " controlId="title">
                  <Form.Control
                    onChange={handleOnChange}
                    name="title"
                    style={{
                      border: "2px solid #BD0707",
                      backgroundColor: "#E0C8C840",
                    }}
                    type="text"
                    placeholder="Name Product"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Control
                    onChange={handleOnChange}
                    name="price"
                    style={{
                      border: "2px solid #BD0707",
                      backgroundColor: "#E0C8C840",
                    }}
                    type="number"
                    placeholder="Price"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="imgProduct">
                  <Form.Control
                    onChange={handleOnChange}
                    name="image"
                    style={{
                      border: "2px solid #BD0707",
                      backgroundColor: "#E0C8C840",
                    }}
                    type="file"
                    placeholder="Photo Product"
                  />
                </Form.Group>
                <Button
                  variant="outline-light"
                  className="btn-product"
                  style={style.bgColor}
                  type="submit"
                  // onClick={() => setPopUp(true)}
                >
                  Add Product
                </Button>
              </Form>
            </Card.Body>
          </Col>
          {preview && (
            <Card.Img
              variant="top"
              src={preview}
              alt={preview}
              style={style.ImgProduct}
            />
          )}
          {/* {popUp && (
            <section
              className="modal fixed z-index-3 w100 h100 flex jc-center ai-center"
              onClick={() => setPopUp(false)}
            >
              <div className="notification-background">
                <h5>Product Has Been Added Successfully</h5>
              </div>
            </section>
          )} */}
        </Row>
      </Card>
    </Container>
  )
}

export default AddProduct