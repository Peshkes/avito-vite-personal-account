import style from './Footer.module.css';
import Logo from "../../shared/images/logo";
import NavList from "../../shared/ui/nav-list/NavList.tsx";

const Footer = () => {
    return (
        <footer className={style.container}>
            <nav className={style.navigation}>
                <NavList/>
            </nav>
            <div className={style.links}>
                <a href="https://github.com/Peshkes" target="_blank" rel="noreferrer">GitHub</a>
            </div>
            <div className={style.copy}>
                <Logo size={35} color={"white"}/>
                <p>Valeriy Peshkes © {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
};

export default Footer;
