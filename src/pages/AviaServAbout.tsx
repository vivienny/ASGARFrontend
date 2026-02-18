import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Alert, Spinner } from 'react-bootstrap'
import Breadcrumbs from '../components/Aviacrumbs'
import SingleAviaCard from '../components/SingleAviaCard'

// TYPE-ONLY импорты
import type { ASGARService } from '../modules/asgarApi'

// Обычные импорты
import { fetchServiceById } from '../modules/asgarApi'
import { MOCK_SERVICES } from '../modules/mock'

import './AviaServAbout.css'

// Ссылка на видео
const BACKGROUND_VIDEO = '/aviafone.mp4'

const ServiceDetailPage = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [service, setService] = useState<ASGARService | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [useMock, setUseMock] = useState(false)

    // Автопроигрывание видео - ОДИН РАЗ
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
            console.log('✅ Данные услуги получены с API')
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

    const handleAddToCart = () => {
        console.log('Добавлено в корзину:', service)
        alert('Услуга добавлена в корзину!')
    }

    // Общая обертка для всех состояний
    const PageWrapper = ({ children }: { children: React.ReactNode }) => (
        <div className="vibes-page">
            {/* ВИДЕО ОДИН РАЗ - ВСЕГДА */}
            <video 
                ref={videoRef}
                className="vibes-background-video"
                src={BACKGROUND_VIDEO}
                loop
                muted
                playsInline
                autoPlay
            />
            <div className="vibes-overlay"></div>
            
            <div className="vibes-content">
                {children}
            </div>
        </div>
    )

    if (loading) {
        return (
            <PageWrapper>
                <Breadcrumbs />
                <div className="text-center py-5">
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
                <Alert variant="danger" className="mt-3">
                    {error}
                    <div className="service-actions mt-3">
                        <button 
                            className="back-button-large"
                            onClick={() => navigate('/services')}
                        >
                            Вернуться к услугам
                        </button>
                    </div>
                </Alert>
            </PageWrapper>
        )
    }

    if (!service) {
        return (
            <PageWrapper>
                <Breadcrumbs />
                <div className="single-service-card">
                    <div className="single-service-content">
                        <h2 className="text-white">Услуга не найдена</h2>
                        <div className="service-actions">
                            <button 
                                className="back-button-large"
                                onClick={() => navigate('/services')}
                            >
                                Вернуться к услугам
                            </button>
                        </div>
                    </div>
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

            <SingleAviaCard
                ID={service.ID}
                Img={service.Img}
                Name={service.Name}
                Info={service.Info}
                FullDescription={service.FullDescription}
                Price={service.Price}
                Unit={service.Unit}
                onAddToCart={handleAddToCart}
                onBack={() => navigate('/services')}
            />
        </PageWrapper>
    )
}

export default ServiceDetailPage