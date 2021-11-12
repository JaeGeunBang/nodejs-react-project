import React, {useEffect} from 'react'
import axios from 'axios';


function LandingPage() {
    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/user')
            .then(response => console.log(response.data))
    }, [])
    return (
        <div>
            LoandingPage
        </div>
    );
}

export default LandingPage