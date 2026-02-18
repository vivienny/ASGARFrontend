import React from 'react'
import type { ASGARService } from '../modules/asgarApi'
import './OverVideoOverlay.css'

interface VideoOverlayProps {
    service: ASGARService
    showFullDescription: boolean
    onToggleDescription: () => void
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ 
    service, 
    showFullDescription, 
    onToggleDescription 
}) => {
    return (
        <div className="video-overlay">
            <div className="video-brand">{service.Name}</div>
            
            {service.Info && !showFullDescription && (
                <div className="video-short-description">{service.Info}</div>
            )}
            
            <div className="video-price-row">
                <span className="video-price">{service.Price} {service.Unit}</span>
                <button 
                    className="video-detail-button"
                    onClick={onToggleDescription}
                >
                    {showFullDescription ? 'Скрыть ▲' : 'Подробнее ▼'}
                </button>
            </div>
            
            {showFullDescription && service.FullDescription && (
                <div className="video-expanded-description">
                    {service.FullDescription}
                </div>
            )}
            
            <div className="video-views">100.0K просмотров</div>
        </div>
    )
}

export default VideoOverlay