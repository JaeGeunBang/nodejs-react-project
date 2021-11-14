import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Auth} from '../_actions/user_action'
import { useNavigate } from "react-router-dom";

// option?
//// null -> 아무나 출입 가능한 페이지
//// true -> 로그인 유저만 출입 가능한 페이지
//// false -> 로그인 유저는 출입이 불가능한 페이지
export default function AuthHoc({ SpecificComponent, option, adminRoute = null }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    dispatch(Auth()).then((response) => {
        //console.log(response)
        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
            if (option) {
                navigate("/login");
            }
        }
        // 로그인 한 상태
        else {
            if (adminRoute && !response.payload.isAdmin) {
                navigate("/");
            } else {
                if (option === false) {
                    navigate("/");
                }
            }
        }
    });

    return <SpecificComponent />;
}