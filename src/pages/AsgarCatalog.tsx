import { useState, useEffect } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import InputField from '../components/inputServ'
import ServiceCard from '../components/ServAviaCard'
import Breadcrumbs from '../components/Aviacrumbs'
import AviaFilter from '../components/AviaFilter'


// TYPE-ONLY импорты для типов
import type { ASGARService, ServicesResponse } from '../modules/asgarApi'

// Обычные импорты для функций
import { fetchServices } from '../modules/asgarApi'
import { MOCK_SERVICES } from '../modules/mock'

import './AsgarCatalog.css'

// Тип для фильтров
interface FilterType {
    search?: string
    min_price?: string
    max_price?: string
    start_date?: string
    end_date?: string
}

const ServicesPage = () => {
    const [filters, setFilters] = useState<FilterType>({})
    const [loading, setLoading] = useState(false)
    const [services, setServices] = useState<ASGARService[]>([])
    const [error, setError] = useState<string | null>(null)
    const [useMock, setUseMock] = useState(false)

    // Функция для фильтрации mock данных (как в методичке 7.1)
    const filterMockServices = (filters: FilterType = {}): ASGARService[] => {
        let filtered = MOCK_SERVICES.filter(service => !service.IsDelete)
        
        if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            filtered = filtered.filter(service =>
                service.Name.toLowerCase().includes(searchLower) ||
                service.Info.toLowerCase().includes(searchLower) ||
                service.FullDescription.toLowerCase().includes(searchLower)
            )
        }
        
        if (filters.min_price) {
            const minPrice = parseFloat(filters.min_price)
            if (!isNaN(minPrice)) {
                filtered = filtered.filter(service => {
                    const price = parseFloat(service.Price)
                    return !isNaN(price) && price >= minPrice
                })
            }
        }
        
        if (filters.max_price) {
            const maxPrice = parseFloat(filters.max_price)
            if (!isNaN(maxPrice)) {
                filtered = filtered.filter(service => {
                    const price = parseFloat(service.Price)
                    return !isNaN(price) && price <= maxPrice
                })
            }
        }
        
        return filtered
    }

    // Загрузка услуг
    useEffect(() => {
        loadServices(filters)
    }, [])

    const loadServices = async (filterParams: FilterType = {}) => {
        setLoading(true)
        setError(null)
        
        try {
            const result: ServicesResponse = await fetchServices(filterParams)
            setServices(result.services)
            setUseMock(false)
            //console.log('✅ Данные получены с API, фильтры:', filterParams)
        } catch (err) {
           // console.log('⚠️ API недоступен, используем mock данные')
            const filteredMock = filterMockServices(filterParams)
            setServices(filteredMock)
            setUseMock(true)
            //setError('Сервер временно недоступен. Показаны тестовые данные.')
        } finally {
            setLoading(false)
        }
    }

    const handleFilterChange = (newFilters: FilterType) => {
        setFilters(newFilters)
        loadServices(newFilters)
    }

    const handleSearch = async (searchValue: string) => {
        const newFilters = { ...filters, search: searchValue }
        setFilters(newFilters)
        loadServices(newFilters)
    }

    return (
        <div className="services-page-wrapper">
            <Breadcrumbs />
            
            <h1 className="page-title">УСЛУГИ</h1>
            
            {error && useMock && (
                <Alert variant="warning" className="mb-3">
                    ⚠️ {error}
                </Alert>
            )}
            
            <div className="filters-wrapper">
                <AviaFilter 
                    onFilterChange={handleFilterChange}
                    isLoading={loading}
                />
            </div>
            
            <div className="search-wrapper mb-4">
                <InputField
                    value={filters.search || ''}
                    setValue={(value) => handleSearch(value)}
                    onSubmit={() => loadServices(filters)}
                    loading={loading}
                    placeholder="Поиск"
                    buttonTitle="Найти"
                />
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                    <p className="mt-3">Загрузка услуг...</p>
                </div>
            ) : services.length === 0 ? (
                <div className="no-results">
                    <h2>К сожалению, ничего не найдено </h2>
                    <p>Попробуйте изменить параметры фильтрации</p>
                </div>
            ) : (
                <>
                    <div className="services-grid-container">
                        {services.map((service) => (
                            <ServiceCard key={service.ID} {...service} />
                        ))}
                    </div>
                    
                    {/*<p className="results-count">
                        Найдено услуг: {services.length}
                        {useMock && ' (тестовые данные)'}
                    </p> */}
                </>
            )}
        </div>
    )
}

export default ServicesPage