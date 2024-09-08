import AppRoutes from "./routes/AppRoutes";
import {BrowserRouter} from "react-router-dom";
import Footer from "../features/footer/Footer";

const App = () => {
    return (
        <div className={"App"}>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
            <Footer/>
        </div>
    );
};

export default App;
