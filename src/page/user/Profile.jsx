import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import users from '../../assets/image/user.png';
import produk1 from '../../assets/image/Produk1.png';
import produk2 from '../../assets/image/Produk2.png';
import Logo from '../../assets/image/logo.svg';
import qode from '../../assets/image/QrCode.png';


export default function Profile(){
    const localData = localStorage.getItem("DATA_USER");
    const data = JSON.parse(localData);
    let getLogin = data;

    const user = [];
  const getUser = () => {
    if (typeof Storage === "undefined") {
      alert("cant store user");
    }

    const localData = localStorage.getItem("LOGIN_STATUS");
    let data = JSON.parse(localData);

    if (data !== null) {
      for (let i = 0; i < data.length; i++) {
        user.push(data[i]);
      }
    }
  };

  getUser();
    return(
        <>  
            <Container>
                <div className='profile d-flex'>
                    <div className='userProfile'>
                        <h3>My Profile</h3>
                        <div className='d-flex'>
                            <img 
                                src={users}
                            />
                            <div className='self'>
                                <div>
                                    <h5>Full Name</h5>
                                    <p>{user[0].name}</p>
                                </div>
                                <div>
                                    <h5>Email</h5>
                                    <p>{user[0].email}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='historyTransaction'>
                        <h3 className='text-black mb-4'>Transaction</h3>
                        <div className='detailTransaction d-flex'>
                            <div className='layoutProduct'>
                            <div className='itemTransaction d-flex'>
                                <img 
                                    src={produk1}
                                />
                                <div className='detailPrice'>
                                    <div>
                                        <h5>Ice Coffee palm Sugar</h5>
                                        <p style={{marginTop:"-7px"}}><strong>Saturday</strong>, 16 November 2022</p>
                                    </div>
                                    <div style={{marginTop:"-5px"}}>
                                        <p><strong style={{color:"#974A4A"}}>Toping</strong> : Bill Berry Boba, Bubble Tea Gelatin</p>
                                        <p style={{marginTop:"-10px", color:"#974A4A"}}>Price : Rp. 33.000</p>
                                    </div>
                                </div>
                            </div>
                            <div className='itemTransaction d-flex'>
                                <img 
                                    src={produk2}
                                />
                                <div className='detailPrice'>
                                    <div>
                                        <h5>Ice Coffee Green Tea</h5>
                                        <p style={{marginTop:"-7px"}}><strong>Saturday</strong>, 11 November 2022</p>
                                    </div>
                                    <div style={{marginTop:"-5px"}}>
                                        <p><strong style={{color:"#974A4A"}}>Toping</strong> : Bill Berry Boba, Bubble Tea Gelatin</p>
                                        <p style={{marginTop:"-10px", color:"#974A4A"}}>Price : Rp. 31.000</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className='brandTransaction'>
                                <div>
                                    <img 
                                    src={Logo}
                                    className="logoBrand"
                                    />
                                </div>
                                <div>
                                    <img 
                                    src={qode}
                                    className={"mt-3"}
                                    width="70"
                                    />
                                </div>
                                <div className='statusTransaction'>
                                    <p>On The Way</p>
                                </div>
                                <div>
                                    <strong className='subTotal'>Sub Total : Rp. 69.000</strong>
                                </div>

                        </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
