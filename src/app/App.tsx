import AppRoutes from "./routes/AppRoutes";
import {BrowserRouter} from "react-router-dom";
import Footer from "../features/footer/Footer";

const App = () => {
    return (
        <div className={"app"}>
            <BrowserRouter>
                <AppRoutes/>
                <Footer/>
            </BrowserRouter>
        </div>
    );
};

export default App;
