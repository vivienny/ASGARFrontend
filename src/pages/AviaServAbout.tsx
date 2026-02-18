import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Alert, Spinner } from 'react-bootstrap'
import Breadcrumbs from '../components/Aviacrumbs'
import VibesContainer from '../components/VibesContainer'

import type { ASGARService } from '../modules/asgarApi'
import { fetchServiceById } from '../modules/asgarApi'
import { MOCK_SERVICES } from '../modules/mock'

import './AviaServAbout.css'

const PRODUCT_VIDEO = '/aviafone.mp4'

const ServiceDetailPage = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [service, setService] = useState<ASGARService | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [useMock, setUseMock] = useState(false)
    const [showFullDescription, setShowFullDescription] = useState(false)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(e => {
                console.log('⚠️ Автовоспроизведение видео не удалось:', e)
            })
        }
    }, [])

    useEffect(() => {
        loadService()
    }, [id])

    const loadService = async () => {
        if (!id) return
        
        setLoading(true)
        setError(null)
        
        const serviceId = parseInt(id)
        
        try {
            const data = await fetchServiceById(serviceId)
            setService(data)
            setUseMock(false)
        } catch (err) {
            const foundService = MOCK_SERVICES.find(s => s.ID === serviceId && !s.IsDelete)
            
            if (foundService) {
                setService(foundService)
                setUseMock(true)
            } else {
                setError('Услуга не найдена')
            }
        } finally {
            setLoading(false)
        }
    }

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription)
    }

    const PageWrapper = ({ children }: { children: React.ReactNode }) => (
        <div className="vibes-page">
            <div className="vibes-black-bg"></div>
            
            <VibesContainer 
                videoRef={videoRef}
                videoSrc={PRODUCT_VIDEO}
                service={service}
                showFullDescription={showFullDescription}
                onToggleDescription={toggleDescription}
            />
            
            <div className="vibes-content">
                {children}
            </div>
        </div>
    )

    if (loading) {
        return (
            <PageWrapper>
                <Breadcrumbs />
                <div className="vibes-loading">
                    <Spinner animation="border" variant="light" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                    <p className="mt-3 text-white">Загрузка деталей услуги...</p>
                </div>
            </PageWrapper>
        )
    }

    if (error && !service) {
        return (
            <PageWrapper>
                <Breadcrumbs />
                <div className="vibes-error">
                    <Alert variant="danger" className="vibes-alert">
                        {error}
                    </Alert>
                </div>
            </PageWrapper>
        )
    }

    if (!service) {
        return (
            <PageWrapper>
                <Breadcrumbs />
                <div className="vibes-not-found">
                    {/* Пусто */}
                </div>
            </PageWrapper>
        )
    }

    return (
        <PageWrapper>
            <Breadcrumbs />
            
            {error && useMock && (
                <Alert variant="warning" className="mb-3">
                    ⚠️ {error}
                </Alert>
            )}
        </PageWrapper>
    )
}

export default ServiceDetailPage