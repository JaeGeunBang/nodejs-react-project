import App from './components/App';
import HomePage from './pages/HomePage';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CourseListPage from "./pages/CourseListPage";
import WishlistPage from "./pages/WishlistPage";
import CoursePage from "./pages/CoursePage";
import QuestionListPage from "./pages/QuestionListPage";
import QuestionPage from "./pages/QuestionPage";

function Main() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="courses">
                    <Route index element={<CourseListPage />} />
                    <Route
                        path="react-frontend-development"
                        element={<CoursePage />}
                    />
                </Route>
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="questions">
                    <Route index element={<QuestionListPage />} />
                    <Route path="616825" element={<QuestionPage />} />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default Main;
