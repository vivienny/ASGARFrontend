import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setTempFilters, applyFilters, resetFilters } from '../store/AviaFilterSlice'
import './AviaFilter.css'

// Убираем onFilterChange из интерфейса, оставляем только isLoading
interface FiltersProps {
    isLoading: boolean
}
 
const Filters = ({ isLoading }: FiltersProps) => {
    const dispatch = useAppDispatch()
    
    // Берем временные фильтры из Redux
    const tempFilters = useAppSelector(state => state.filters.tempFilters)
    
    // Временные значения для применения только по кнопке
    const [tempMinPrice, setTempMinPrice] = useState(tempFilters.min_price || '')
    const [tempMaxPrice, setTempMaxPrice] = useState(tempFilters.max_price || '')
    const [tempSortOrder, setTempSortOrder] = useState<'asc' | null>(
        tempFilters.sort_order === 'asc' ? 'asc' : null
    )

    // Если фильтры в Redux изменились снаружи, обновляем поля
    useEffect(() => {
        setTempMinPrice(tempFilters.min_price || '')
        setTempMaxPrice(tempFilters.max_price || '')
        setTempSortOrder(tempFilters.sort_order === 'asc' ? 'asc' : null)
    }, [tempFilters])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        // Сохраняем временные фильтры в Redux
        dispatch(setTempFilters({
            min_price: tempMinPrice || undefined,
            max_price: tempMaxPrice || undefined,
            sort_order: tempSortOrder || undefined
        }))
        
        // Применяем фильтры
        dispatch(applyFilters())
    }

    const handleReset = () => {
        // Очищаем локальные состояния
        setTempMinPrice('')
        setTempMaxPrice('')
        setTempSortOrder(null)
        
        // Очищаем фильтры в Redux
        dispatch(resetFilters())
    }

    const handleSortAsc = () => {
        const newSort = tempSortOrder === 'asc' ? null : 'asc'
        setTempSortOrder(newSort)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="filters-container">
            <h5 className="filters-title">Фильтры</h5>
            
            <div className="filters-row">
                {/* Цена */}
                <div className="price-range">
                    <Form.Group className="price-group">
                        <Form.Label>Цена от</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="0 ₽"
                            value={tempMinPrice}
                            onChange={(e) => setTempMinPrice(e.target.value)}
                            onKeyDown={handleKeyDown}
                            min="0"
                            className="filters-control"
                        />
                    </Form.Group>
                    <Form.Group className="price-group">
                        <Form.Label>Цена до</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="100000 ₽"
                            value={tempMaxPrice}
                            onChange={(e) => setTempMaxPrice(e.target.value)}
                            onKeyDown={handleKeyDown}
                            min="0"
                            className="filters-control"
                        />
                    </Form.Group>
                </div>

                {/* Сортировка по названию */}
                <div className="sort-group">
                    <Form.Label>Сортировка</Form.Label>
                    <div className="sort-buttons">
                        <Button
                            type="button"
                            onClick={handleSortAsc}
                            className={`btn-sort ${tempSortOrder === 'asc' ? 'active' : ''}`}
                        >
                            <span>А → Я</span>
                        </Button>
                    </div>
                </div>

                {/* Кнопки действий */}
                <div className="filters-actions">
                    <Button 
                        type="button"
                        onClick={handleReset}
                        className="btn-filter-reset"
                    >
                        🗑️ Сброс
                    </Button>
                    <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="btn-filter-apply"
                    >
                        {isLoading ? '⏳...' : 'Применить'}
                    </Button>
                </div>
            </div>
        </Form>
    )
}

export default Filters