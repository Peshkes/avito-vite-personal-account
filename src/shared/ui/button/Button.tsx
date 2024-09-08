import style from './Button.module.css';

type ButtonProps = {
    children: string,
    onClick: () => void
}


const Button = ({children, onClick}: ButtonProps) => {
    return (
        <button className={style.button} onClick={onClick}>
            {children}
            <span className={style.arrow}>→</span>
        </button>
    );
};

export default Button;
