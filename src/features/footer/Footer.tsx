import style from './Footer.module.css';
import Logo from "../../shared/images/logo";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className={style.container}>
            <nav className={style.navigation}>
                <ul>
                    <li><Link to="/">Все объявления</Link></li>
                    <li><Link to="/orders">Все заказы</Link></li>
                </ul>
            </nav>
            <div className={style.links}>
                <a href="https://github.com/Peshkes" target="_blank" rel="noreferrer">GitHub</a>
            </div>
            <div className={style.copy}>
                <Logo size={50} color={"white"}/>
                <p>Peshkes Valeriy © {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
};

export default Footer;
