import React, {useEffect} from 'react';
import {Navigate, useLocation, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const RequireAuth = ({children}) => {
    const [searchParams] = useSearchParams();
    const secretKey = searchParams.get("secretKey") || null;
    const location = useLocation();

    const dispatch = useDispatch();
    const {hasFreshData, actionFreshData} = useSelector(state => state.auth)
    useEffect(() => {
        if (hasFreshData === null) {
            // dispatch(dataSourceActions.getHasFreshData())
        }
    }, [dispatch, hasFreshData])
    if (hasFreshData) {
        return <Navigate to={"/login"} replace state={{from: location, actionFreshData, secretKey}}/>
    }


    return (
        <div>
            {children}
        </div>
    );
};

export  {RequireAuth};