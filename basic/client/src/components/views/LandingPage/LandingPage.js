import React from 'react'
import axios from 'axios';


function LandingPage() {
    const onClickHandler = () => {
        axios.get('http://localhost:8000/api/v1/user/logout',
            {
                withCredentials: true
            })
            .then(response => {
                console.log(response.data)
            })
    }

    return (
        <div style={ { display:'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
            <h2> 시작 페이지 </h2>

            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    );
}

export default LandingPage