import style from './Header.module.css';
import Logo from "../../images/Logo.tsx";
import NavList from "../../ui/nav-list/NavList.tsx";

const Header = () => {
    return (
        <header className={style.header}>
            <Logo size={50} color={"black"}/>
            <nav className={style.blackBlock}>
                <NavList/>
            </nav>
        </header>
    );
};

export default Header;
