import * as React from 'react'
import type { RefObject } from 'react'
import VideoOverlay from './OverVideoOverlay'
import type { ASGARService } from '../modules/asgarApi'
import './VibesContainer.css'

interface VibesContainerProps {
    videoRef: RefObject<HTMLVideoElement | null>
    videoSrc: string
    service: ASGARService | null
    showFullDescription: boolean
    onToggleDescription: () => void
}

const VibesContainer: React.FC<VibesContainerProps> = ({
    videoRef,
    videoSrc,
    service,
    showFullDescription,
    onToggleDescription
}) => {
    return (
        <div className="vibes-video-container">
            <video 
                ref={videoRef}
                className="vibes-product-video"
                src={videoSrc}
                loop
                muted
                playsInline
                autoPlay
            />
            
            {service && (
                <VideoOverlay 
                    service={service}
                    showFullDescription={showFullDescription}
                    onToggleDescription={onToggleDescription}
                />
            )}
        </div>
    )
}

export default VibesContainer