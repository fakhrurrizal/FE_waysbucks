import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/userContext";
import { API } from "../../config/api";


export default function Income() {
    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext)
    const [transaction, setTransaction] = useState([])
    const [transactionPopUp, setTransactionPopUp] = useState(false);

    const getTransaction = async () => {
        try{
            const res = await API.get(`/transactions`);
            setTransaction(res.data.data);
        } catch (error){
            console.error(error)
        }
    };

    useEffect(() => {
        if (state.isLogin === false || state.user.status === "user"){
            navigate('/')
        }else {
            getTransaction()
        }
    }, [])

    return(
        <>
            <main>
                <section>
                    <h1 className="text-red mb2-5">Income Transaction</h1>
                    <table>
                        <thead className="bg-gray">
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Product</th>
                                <th>Income</th>
                                <th>Status</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            { transaction.map((data, index)=> (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{data.users.name}</td>
                                    <td>{data.order.map((data,index) => (
                                        <h6 className="productIncome" key={index}> 
                                            {data.product.title},
                                        </h6>
                                    ))}</td>
                                    <td>Rp. {data.subtotal}</td>
                                    <td>{data.status}</td>
                                    
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </section>
            </main>
        </>
    )

}