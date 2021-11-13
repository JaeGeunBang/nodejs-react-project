import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RegisterUser} from "../../../_actions/user_action";

function RegisterPage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [UserId, setUserId] = useState("")
    const [Nickname, setNickname] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onUserIdHandler = (event) => {
        setUserId(event.currentTarget.value)
    }

    const onNicknameHandler = (event) => {
        setNickname(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            userId: UserId,
            nickname: Nickname,
            password: Password
        }

        dispatch(RegisterUser(body))
            .then(response => {
                if(response.payload.registerSuccess) {
                    navigate(-1);
                    props.history.push('/login')
                } else {
                    alert(response.payload.message)
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
                <label>Nickname</label>
                <input type="text" value={Nickname} onChange={onNicknameHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button>
                    회원 가입
                </button>
            </form>
        </div>
    );
}

export default RegisterPage