import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import './AviaFilter.css'

interface FiltersProps {
    onFilterChange: (filters: {
        min_price?: string
        max_price?: string
        sort_order?: 'asc'
    }) => void
    isLoading: boolean
}
 
const Filters = ({ onFilterChange, isLoading }: FiltersProps) => {
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [sortOrder, setSortOrder] = useState<'asc' | null>(null)
    
    // Временные значения для применения только по кнопке
    const [tempMinPrice, setTempMinPrice] = useState('')
    const [tempMaxPrice, setTempMaxPrice] = useState('')
    const [tempSortOrder, setTempSortOrder] = useState<'asc' | null>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        const filters: any = {}
        if (tempMinPrice) filters.min_price = tempMinPrice
        if (tempMaxPrice) filters.max_price = tempMaxPrice
        if (tempSortOrder) filters.sort_order = tempSortOrder
        
        // Синхронизируем временные значения с основными
        setMinPrice(tempMinPrice)
        setMaxPrice(tempMaxPrice)
        setSortOrder(tempSortOrder)
        
        console.log('📤 Отправляем фильтры (submit):', filters)
        onFilterChange(filters)
    }

    const handleReset = () => {
        setTempMinPrice('')
        setTempMaxPrice('')
        setTempSortOrder(null)
        setMinPrice('')
        setMaxPrice('')
        setSortOrder(null)
        
        console.log('🔄 Сброс фильтров')
        onFilterChange({})
    }

    const handleSortAsc = () => {
        const newSort = tempSortOrder === 'asc' ? null : 'asc'
        setTempSortOrder(newSort)
    }

    // Предотвращаем отправку по Enter
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
                            onChange={(e) => {
                                console.log('💰 Цена от (временная):', e.target.value)
                                setTempMinPrice(e.target.value)
                            }}
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
                            onChange={(e) => {
                                console.log('💰 Цена до (временная):', e.target.value)
                                setTempMaxPrice(e.target.value)
                            }}
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