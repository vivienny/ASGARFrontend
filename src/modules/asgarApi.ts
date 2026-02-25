// Интерфейсы
export interface ASGARService {
    ID: number
    Img: string
    Name: string
    Info: string
    Price: string
    FullDescription: string
    Unit: string
    IsDelete: boolean
}

export interface ServicesResponse {
    services: ASGARService[]
    count: number
}

// Базовый URL API в зависимости от окружения
const API_BASE = import.meta.env.PROD 
    ? 'http://192.168.1.6:8080'  // ← ИСПРАВЛЕННЫЙ IP!
    : '/api'  // в разработке через прокси

// API функции с поддержкой фильтров
export const fetchServices = async (filters: {
    search?: string
    min_price?: string
    max_price?: string
    start_date?: string
    end_date?: string
    sort_order?: 'asc' | 'desc'
} = {}): Promise<ServicesResponse> => {
    try {
        // Собираем query параметры
        const params = new URLSearchParams()
        
        if (filters.search) params.append('search', filters.search)
        if (filters.min_price) params.append('min_price', filters.min_price)
        if (filters.max_price) params.append('max_price', filters.max_price)
        if (filters.start_date) params.append('start_date', filters.start_date)
        if (filters.end_date) params.append('end_date', filters.end_date)
        if (filters.sort_order) params.append('sort_order', filters.sort_order)
        
        const queryString = params.toString()
        
        // ВАЖНО: В продакшене ДОБАВЛЯЕМ /api (как требует бэкенд)
        const url = import.meta.env.PROD
            ? `${API_BASE}/api/services${queryString ? `?${queryString}` : ''}`  // ← ВЕРНУЛ /api
            : `/api/services${queryString ? `?${queryString}` : ''}`  // ← через прокси
        
        console.log('🔍 Запрос к API с фильтрами:', url)
        
        const response = await fetch(url)
        
        if (!response.ok) {
            throw new Error(`Ошибка API: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Получаем массив услуг
        let services = data.services || data || []
        
        // Если массив пришел, но это не массив — преобразуем
        if (!Array.isArray(services)) {
            services = []
        }
        
        // 🔥 ФИЛЬТРАЦИЯ НА ФРОНТЕ (если бэкенд не фильтрует)
        
        // Фильтр по минимальной цене
        if (filters.min_price) {
            services = services.filter((item: ASGARService) => 
                Number(item.Price) >= Number(filters.min_price)
            )
        }
        
        // Фильтр по максимальной цене
        if (filters.max_price) {
            services = services.filter((item: ASGARService) => 
                Number(item.Price) <= Number(filters.max_price)
            )
        }
        
        // Фильтр по поиску (если есть)
        if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            services = services.filter((item: ASGARService) => 
                item.Name.toLowerCase().includes(searchLower) ||
                item.Info.toLowerCase().includes(searchLower)
            )
        }
        
        // Фильтр по датам (если нужно)
        if (filters.start_date || filters.end_date) {
            // Тут логика фильтрации по датам, если у услуг есть даты
            // Пока оставляем заглушку
        }
        
        // 🔥 СОРТИРОВКА НА ФРОНТЕ
        if (filters.sort_order === 'asc') {
            services.sort((a: ASGARService, b: ASGARService) => 
                a.Name.localeCompare(b.Name, 'ru')
            )
        }
        if (filters.sort_order === 'desc') {
            services.sort((a: ASGARService, b: ASGARService) => 
                b.Name.localeCompare(a.Name, 'ru')
            )
        }
        
        return {
            services: services,
            count: services.length
        }
    } catch (error) {
        console.error('❌ Ошибка при запросе к API:', error)
        throw error
    }
}

export const fetchServiceById = async (id: number): Promise<ASGARService> => {
    try {
        // ВАЖНО: В продакшене ДОБАВЛЯЕМ /api (как требует бэкенд)
        const url = import.meta.env.PROD
            ? `${API_BASE}/api/services/${id}`  // ← ВЕРНУЛ /api
            : `/api/services/${id}`  // ← через прокси
        
        console.log('🔍 Запрос к API:', url)
        
        const response = await fetch(url)
        
        if (!response.ok) {
            throw new Error(`Ошибка API: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('📦 Ответ от API:', data)
        
        // ФИКС: Извлекаем объект service из ответа
        const service = data.service || data
        
        if (!service) {
            throw new Error('Сервис не найден в ответе')
        }
        
        return service
    } catch (error) {
        console.error('❌ Ошибка при запросе деталей услуги:', error)
        throw error
    }
}