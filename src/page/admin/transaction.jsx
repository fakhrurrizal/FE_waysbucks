import React, { useContext } from "react";

import Table from 'react-bootstrap/Table';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/esm/Container';
import Stack from 'react-bootstrap/Stack';
import Success from "../../assets/image/success.png";
import Cancel from "../../assets/image/cancel.png";
import Img from 'react-bootstrap/Image';
import { API } from "../../config/api";
import { useQuery, useMutation } from "react-query";
import { UserContext } from "../../Contexts/userContext";


function TableProduct() {
    const [state] = useContext(UserContext)


    let { data: admin, refetch } = useQuery(
        "AdminCache",
        async () => {
            if (state.user.role === "admin") {
                const response = await API.get("/transactions")
                return response.data.data
            }
        })

    console.log("Response Table =>", admin)
    

    let income = 0

    const HandleCancel = useMutation(async (id) => {
        console.log("cancel id ", id)
        try {
            const res = await API.patch("/canceltrans/" + id)
            refetch()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    })

    const HandleAccept = useMutation(async (id) => {
        console.log("accept id", id)
        try {
            const response = await API.patch("/accepttrans/" + id)
            refetch()
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    })
    return (
        <>
            <Container>
                <h2>Transaction</h2>
                <Table responsive striped bordered hover className="my-3 table-white">
                    <thead>
                        <tr className="table-dark">
                            <th>No</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Income</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            admin === 0 ?
                                <tr>
                                    <td colSpan={6}>Not Transaction</td>
                                </tr>
                                :
                                admin?.map((element, number) => {
                                    number += 1
                                    // console.log("income", income)
                                    // console.log("subtotal", element.subtotal)

                                    if (element.status === "Success") {
                                        income += element.subtotal

                                    }
                                    return (
                                        <>
                                            <tr>
                                                <td>{number}</td>
                                                <td>{element.name}</td>
                                                <td>{element.address}</td>
                                                <td>
                                                    Rp.{element.subtotal}
                                                </td>
                                                <td>
                                                    {
                                                        element.status === "Payment" ?
                                                            <label className="text-warning">Waiting Approve</label>
                                                            : element.status === "Success" ?
                                                                <label className="text-success">Success</label>
                                                                : element.status === "Cancel" ?
                                                                    <label className="text-danger">Cancel</label>
                                                                    : null
                                                    }
                                                </td>
                                                <th>
                                                    {element.status === "Payment" ?
                                                        <Stack direction="horizontal" gap={3} className="d-flex justify-content-center">
                                                            <Button variant="danger" onClick={() => HandleCancel.mutate(element.id)}>Cancel</Button>
                                                            <Button variant="success" onClick={() => HandleAccept.mutate(element.id)}>Accept</Button>
                                                        </Stack>
                                                        : element.status === "Success" ?
                                                            <div className="d-flex justify-content-center">
                                                                <Img
                                                                    src={Success}
                                                                    style={{
                                                                        width: "30px",
                                                                        height: "30px",
                                                                    }}
                                                                />
                                                            </div>
                                                            : element.status === "Cancel" ?
                                                                <div className="d-flex justify-content-center">
                                                                    <Img
                                                                        src={Cancel}
                                                                        style={{
                                                                            width: "30px",
                                                                            height: "30px",

                                                                        }}
                                                                    />
                                                                </div>
                                                                : null
                                                    }
                                                </th>
                                            </tr>
                                        </>
                                    )
                                })
                        }
                        <tr className="table-white justify-content-center" >
                            <th colSpan={8}>Income : Rp. {income}</th>
                        </tr>
                    </tbody>

                </Table>
            </Container>
        </>
    )
}

export default TableProduct;