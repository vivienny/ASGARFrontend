import { useState } from 'react'
import './AccordAvia.css'

interface FeatureItem {
    id: string
    title: string
}

const featuresData: FeatureItem[] = [
    {
        id: '1',
        
        title: 'Просмотр каталога услуг',
        
    },
    {
        id: '2',
        
        title: 'Фильтрация услуг по названию',
        
    },
    {
        id: '3',
        
        title: 'Детальная информация о каждой услуге',
        
    }
]

const AviaAccordion = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleAccordion = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="avia-accordion-single">
            <div 
                className={`accordion-main-header ${isOpen ? 'open' : ''}`}
                onClick={toggleAccordion}
            >
                
                <span className="accordion-main-title">Возможности</span>
                <span className="accordion-main-arrow">
                    {isOpen ? '▲' : '▼'}
                </span>
            </div>
            
            {isOpen && (
                <div className="accordion-content-area">
                    <div className="features-grid">
                        {featuresData.map((feature) => (
                            <div key={feature.id} className="feature-card-compact">
                                <div className="feature-card-header">
                                    
                                    <span className="feature-card-title">{feature.title}</span>
                                </div>
                               
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AviaAccordion