import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
//import {Auth} from "./_actions/user_action";
import AuthHoc from "./hoc/auth";

function App() {
    // Auth option
    // null -> 누구나 접근 가능
    // true -> 로그인 한 유저만 접근 가능
    // false -> 로그인 한 유저는 접근 불가능
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<AuthHoc SpecificComponent={LandingPage} option={null} />}
                />
                <Route
                    path="/login"
                    element={<AuthHoc SpecificComponent={LoginPage} option={false} />}
                />
                <Route
                    path="/register"
                    element={<AuthHoc SpecificComponent={RegisterPage} option={false} />}
                />
            </Routes>
        </Router>
    );
}

export default App;

