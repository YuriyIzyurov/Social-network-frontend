import React from 'react';
import './ErrorPage.scss'
import CatImage from "assets/images/Funny_Cat_Vector_Illustration.png";

type PropsType = {
    blogError:string | null
    socialError:string | null
}
const ErrorPage:React.FC<PropsType> = ({blogError, socialError}) => {
    return (
        <div className='serverError'>
            <header className='serverError__header'>
                Что-то пошло не так. Невозможно подключиться к серверу.
            </header>
            <body className='serverError__body'>
                    <img src={CatImage} alt=""/>
                    <p>
                        По какой-то причине связь с серверами пропала :( Попробйуте зайти позже или можете сообщить о поломке на почту для скорейшего возобновления работы сайта.
                        {blogError ? `Ошибка при получении статей : ${blogError}` : socialError ? `Ошибка при подключении к соц.сети : ${socialError}` : 'Ошибок нет'}
                    </p>
            </body>
            <footer className='serverError__body-footer'>
                <a href="mailto:batm1x1@gmail.com?subject=Не%20работает%20приложение">Отправить письмо</a>
                <span>Электронная почта:</span>
                <span>batm1x1@gmail.com</span>
            </footer>
        </div>
    );
};
export default ErrorPage
