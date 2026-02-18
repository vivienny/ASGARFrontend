import { getServiceImageUrl, handleImageError } from '../utilts/imageUtilts' // ← ДОБАВЛЯЕМ ИМПОРТ
import './SingleAviaCard.css'

interface Props {
    ID: number
    Img: string
    Name: string
    Info: string
    FullDescription: string
    Price: string
    Unit: string
    onAddToCart: () => void
    onBack: () => void
}

const SingleAviaCard = ({ 
    ID,
    Img, 
    Name, 
    Info, 
    FullDescription, 
    Price, 
    Unit,
    //onAddToCart,
    //onBack 
}: Props) => {
    
    // ОТЛАДКА - добавьте этот код
    console.log('🔍 [SingleAviaCard] Получены props:')
    console.log('  - ID:', ID)
    console.log('  - Img:', Img)
    console.log('  - Name:', Name)
    console.log('  - Тип Img:', typeof Img)
    
    const imageUrl = getServiceImageUrl(Img)
    console.log('  - Результат getServiceImageUrl:', imageUrl)
    
    return (
        <div className="single-avia-card">
            <div className="single-avia-image">
                {/* БЛОК ОТЛАДКИ - будет виден на странице 
                <div style={{
                    backgroundColor: '#fff3cd',
                    border: '1px solid #ffeaa7',
                    borderRadius: '5px',
                    padding: '10px',
                    marginBottom: '15px',
                    fontSize: '14px',
                    color: '#856404'
                }}>
                    <strong>🛠️ ОТЛАДКА КОМПОНЕНТА:</strong>
                    <div style={{ marginTop: '5px', fontFamily: 'monospace' }}>
                        <div>📁 <strong>Img от бэкенда:</strong> <code>{Img || '(пусто)'}</code></div>
                        <div>🔗 <strong>Используемый URL:</strong> <code>{imageUrl}</code></div>
                        <div>📊 <strong>Длина строки:</strong> {Img?.length || 0} символов</div>
                    </div>
                </div> */}
                
                <img 
                    src={imageUrl} // ← ИСПОЛЬЗУЕМ УТИЛИТУ ВМЕСТО Img || '/default-service.jpg'
                    alt={Name}
                    onError={(e) => {
                        console.error('❌ ОШИБКА загрузки изображения!')
                        console.error('Пытался загрузить:', e.currentTarget.src)
                        handleImageError(e)
                    }}
                    onLoad={() => console.log('✅ Изображение успешно загружено!')}
                />
            </div>
            
            <div className="single-avia-content">
                <h2>{Name}</h2>
                
                <div className="avia-description">
                    {Info}
                </div>
                
                <div className="avia-full-description">
                    {FullDescription}
                </div>
                
             
                
                <div className="avia-price">
                    <h3>Стоимость:</h3>
                    <div className="avia-price-value">{Price} {Unit}</div>
                </div>
                
                
            </div>
        </div>
    )
}

export default SingleAviaCard