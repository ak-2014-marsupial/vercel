import React, {useState} from 'react';

import {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify} from 'react-icons/bs'
import {
    BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
    BsListCheck, BsMenuButtonWideFill, BsFillGearFill
} from "react-icons/bs";

const AboutPage = () => {
    const [result, setResult] = useState("")

    const fetchInfo = async () => {
        const url = `${process.env.REACT_APP_API_URL}/test`;
        const response = await fetch(url);
        const json = await response.json();
        setResult(json)
    }


    return (
        <div>
            <button onClick={fetchInfo}>fetch info from Vercel</button>
            <div>result:{result}</div>
            <div style={{display: "flex", gap:"6rem"}}>
                <div style={{display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "2rem", color: "red"}}>
                    <div><BsFillBellFill className="icon"/> Alerts</div>
                    <div><BsSearch className="icon"/> Search</div>


                    <BsFillEnvelopeFill className="icon"/>
                    <BsPersonCircle/>

                    <BsJustify/>
                </div>
                <div
                    style={{display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "2rem", color: "green"}}>

                    <div><BsCart3/> Shop</div>
                    <div><BsGrid1X2Fill/> Dashboard</div>
                    <div><BsFillArchiveFill/> Products</div>
                    <div><BsFillGrid3X3GapFill/> Categories</div>
                    <div><BsPeopleFill/> Customers</div>
                    <div><BsListCheck/> Inventory</div>
                    <div><BsMenuButtonWideFill/> Reports</div>
                    <div><BsFillGearFill/> Settings</div>
                </div>
            </div>

        </div>
    );
}

export {AboutPage};