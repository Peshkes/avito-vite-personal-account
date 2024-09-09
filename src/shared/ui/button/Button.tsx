import style from './Button.module.css';

type ButtonProps = {
    children: string,
    onClick: () => void
    withArrow?: boolean
}


const Button = ({children, onClick, withArrow = true}: ButtonProps) => {
    return (
        <button className={style.button} onClick={onClick}>
            {children}
            {withArrow && <span className={style.arrow}>→</span>}
        </button>
    );
};

export default Button;
