import style from './NotFountPage.module.css';
import {useLocation, useNavigate} from 'react-router-dom';
import Button from "../../shared/ui/button/Button.tsx";


const NotFoundPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const badUrl = location.pathname;

    return (
        <main className={style.container}>
            <h1>Упс! Страница не найдена</h1>
            <p>Запрашиваемый URL: <code>{badUrl}</code></p>
            <Button onClick={() => navigate('/')}>На главную</Button>
        </main>
    );
};

export default NotFoundPage;
