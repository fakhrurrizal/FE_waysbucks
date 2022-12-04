import React from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../component/card';
import Produk from '../component/listProduk';
import transaction from '../page/admin/transaction'



export default function Home() {

    return(
           <>
            <Card/>
            <Produk />
            <transaction />
           </>
    )
}