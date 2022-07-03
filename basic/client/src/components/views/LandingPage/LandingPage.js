import React, {useEffect} from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";

function LandingPage() {
    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/state/get-state')
            .then(response => {
                console.log(response.data)
            })
    }, [])
    return (
        <>
            <div className="app">
            </div>
        </>
    )
}

export default LandingPage
