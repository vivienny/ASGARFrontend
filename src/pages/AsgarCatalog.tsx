import { useState, useEffect } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import InputField from '../components/inputServ'
import ServiceCard from '../components/ServAviaCard'
import Breadcrumbs from '../components/Aviacrumbs'
import AviaFilter from '../components/AviaFilter'

import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setTempFilters, applyFilters, setLoading, setError } from '../store/AviaFilterSlice'

// TYPE-ONLY импорты для типов
import type { ASGARService, ServicesResponse } from '../modules/asgarApi'

// Обычные импорты для функций
import { fetchServices } from '../modules/asgarApi'
import { MOCK_SERVICES } from '../modules/mock'

import './AsgarCatalog.css'

// Тип для фильтров (импортируем из слайса)
import type { FilterType } from '../store/AviaFilterSlice'

const ServicesPage = () => {
    const dispatch = useAppDispatch()
    
    // Берем ПРИМЕНЕННЫЕ фильтры из Redux
    const appliedFilters = useAppSelector(state => state.filters.appliedFilters)
    const tempFilters = useAppSelector(state => state.filters.tempFilters)
    const reduxLoading = useAppSelector(state => state.filters.loading)
    
    const [loading, setLocalLoading] = useState(false)
    const [services, setServices] = useState<ASGARService[]>([])
    const [error, setLocalError] = useState<string | null>(null)
    const [useMock, setUseMock] = useState(false)

    // Функция для фильтрации mock данных
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

    // Загрузка услуг при изменении appliedFilters
    useEffect(() => {
        loadServices(appliedFilters)
    }, [appliedFilters])

    const loadServices = async (filterParams: FilterType = {}) => {
        setLocalLoading(true)
        dispatch(setLoading(true))
        setLocalError(null)
        dispatch(setError(null))
        
        try {
            const result: ServicesResponse = await fetchServices(filterParams)
            setServices(result.services)
            setUseMock(false)
        } catch (err) {
            const filteredMock = filterMockServices(filterParams)
            setServices(filteredMock)
            setUseMock(true)
        } finally {
            setLocalLoading(false)
            dispatch(setLoading(false))
        }
    }

    // Обработчик изменения текста поиска
    const handleSearchChange = (searchValue: string) => {
        dispatch(setTempFilters({
            ...tempFilters,
            search: searchValue || undefined
        }))
    }

    // Обработчик нажатия на кнопку "Найти"
    const handleSearchSubmit = () => {
        dispatch(applyFilters()) // применяем все временные фильтры
    }

    return (
        <>
            
            <div className="services-page-wrapper">
                <Breadcrumbs />
                
                <h1 className="page-title">УСЛУГИ</h1>
                
                {error && useMock && (
                    <Alert variant="warning" className="mb-3">
                        ⚠️ {error}
                    </Alert>
                )}
                
                <div className="filters-wrapper">
                    <AviaFilter isLoading={loading || reduxLoading} />
                </div>
                
                <div className="search-wrapper mb-4">
                    <InputField
                        value={tempFilters.search || ''}
                        setValue={handleSearchChange}
                        onSubmit={handleSearchSubmit}  // ← теперь работает!
                        loading={loading || reduxLoading}
                        placeholder="Поиск"
                        buttonTitle="Найти"
                    />
                </div>

                {loading || reduxLoading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Загрузка...</span>
                        </Spinner>
                        <p className="mt-3">Загрузка услуг...</p>
                    </div>
                ) : services.length === 0 ? (
                    <div className="no-results">
                        <h2>К сожалению, ничего не найдено</h2>
                        <p>Попробуйте изменить параметры фильтрации</p>
                    </div>
                ) : (
                    <div className="services-grid-container">
                        {services.map((service) => (
                            <ServiceCard key={service.ID} {...service} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default ServicesPage