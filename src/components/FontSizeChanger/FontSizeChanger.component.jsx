import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {appHelperActions} from "../../redux/slices/app.slice.js";
import {appConstants} from "../../constants/app.constants.js";


const {fontSizeMax, fontSizeMin, fontSizeStep} = appConstants;
const FontSizeChangerComponent = () => {
    const initFontSize = useSelector(state => state.app.fontSize)
    const [fontSize, setFontSize] = useState(initFontSize);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const value = e.target.value;
        setFontSize(value);
        dispatch(appHelperActions.setFontSize(value))
    }
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{fontSize: "0.6rem"}}>Розмір шрифта</div>
            <input type="range"
                   min={fontSizeMin}
                   max={fontSizeMax}
                   step={fontSizeStep}
                   value={Number(fontSize) || 16}
                   onChange={(e) => handleChange(e)}
            />
        </div>
    );
};

export {FontSizeChangerComponent};