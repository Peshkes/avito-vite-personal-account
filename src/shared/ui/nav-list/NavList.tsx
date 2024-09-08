import style from './NavList.module.css';
import {NavLink} from "react-router-dom";
import {CSSProperties} from "react";


type Props = {
    styleFunction?: CSSProperties | ((props: { isActive: boolean }) => CSSProperties | undefined) | undefined
}

const navLinkStyleFunction = ({isActive}: { isActive: boolean }): CSSProperties => {
    return {
        textDecoration: isActive ? 'underline' : 'none'
    };

};
const NavList = ({styleFunction = navLinkStyleFunction}: Props) => {
    return (
        <ul className={style.navigation}>
            <li><NavLink style={styleFunction} to="/">Объявления</NavLink></li>
            <li><NavLink style={styleFunction} to="/orders">Заказы</NavLink></li>
        </ul>
    );
};

export default NavList;
