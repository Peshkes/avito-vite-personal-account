import AppRoutes from "./routes/AppRoutes";
import {BrowserRouter} from "react-router-dom";
import Footer from "../features/footer/Footer";
import Cursor from "../features/cursor/Cursor.tsx";
import Header from "../features/header/Header.tsx";


const App = () => {
    return (
        <div className={"app"}>
            <BrowserRouter>
                <Header/>
                <AppRoutes/>
                <Footer/>
            </BrowserRouter>
            <Cursor/>
        </div>
    );
};

export default App;
