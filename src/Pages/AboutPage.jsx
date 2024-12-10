import React, {useState} from 'react';

import {DropDownComponent} from "../components/DropDown/DropDown.component.jsx";

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
            <DropDownComponent/>
        </div>
    );
};

export  {AboutPage};