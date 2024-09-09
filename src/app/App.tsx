import AppRoutes from "./routes/AppRoutes";
import {BrowserRouter} from "react-router-dom";
import Footer from "../shared/components/footer/Footer";
import Cursor from "../shared/components/cursor/Cursor.tsx";
import Header from "../shared/components/header/Header.tsx";


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
