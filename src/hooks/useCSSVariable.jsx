import {useEffect} from "react";

const useCSSVariable = (variable, value) => {
    useEffect(() => {
        document.documentElement.style.setProperty(variable, value);
    }, [variable, value]);
};

export {useCSSVariable};