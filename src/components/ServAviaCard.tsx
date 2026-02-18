import { Link } from 'react-router-dom'
import { getServiceImageUrl, handleImageError } from '../utilts/imageUtilts' // ← ДОБАВЛЯЕМ ИМПОРТ
import './ServAviaCard.css'

interface Props {
    ID: number
    Img: string
    Name: string
    Info: string
    Price: string
    Unit: string
}

const ServiceCard = ({ ID, Img, Name, Info, Price, Unit }: Props) => {
    return (
        <div className="card">
            <img 
                className="cardImage" 
                src={getServiceImageUrl(Img)} // ← ИСПОЛЬЗУЕМ УТИЛИТУ
                alt={Name}
                height={100} 
                width={100}
                onError={handleImageError} // ← ДОБАВЛЯЕМ ОБРАБОТЧИК ОШИБОК
            />
            <div className="cardBody">
                <div className="textStyle">
                    <h3>{Name}</h3>
                </div>
                <div className="textStyle">
                    <p>{Info}</p>
                </div>
                <div className="textStyle">
                    <p><strong>Цена:</strong> {Price} {Unit}</p>
                </div>
                <Link to={`/services/${ID}`} className="cardButton">
                    Подробнее
                </Link>
            </div>
        </div>
    )
}

export default ServiceCard