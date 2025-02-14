import { Link } from 'react-router-dom'
import s from './NotFoundPage.module.css'
import { IoArrowBackOutline } from "react-icons/io5";

const NotFoundPage = () => {
    return <div className={s.notFoundPage}>
        <div className={s.linkWrapper}>
        <IoArrowBackOutline stroke = "#fff" size={24}/>
        <Link to="/" className={s.link}>Go to home</Link>
        </div>
        <p className={s.notFound}>Page not found</p>
    </div>
}
export default NotFoundPage