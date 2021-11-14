import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {loginUser} from "../../../_actions/user_action";

import { useNavigate } from "react-router-dom";

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [UserId, setUserId] = useState("")
    const [Password, setPassword] = useState("")

    const onUserIdHandler = (event) => {
        setUserId(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            userId: UserId,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    navigate("/")
                } else {
                    alert('Error ')
                }
        })
    }

    return (
        <div style={ { display:'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
            <form style ={{display:'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>UserId</label>
                <input type="text" value={UserId} onChange={onUserIdHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button>
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginPage