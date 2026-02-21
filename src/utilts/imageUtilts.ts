/**
 * Утилита для обработки изображений услуг
 */

// Базовый URL бэкенда - для GitHub Pages нужно указывать реальный IP
const API_BASE = import.meta.env.PROD 
  ? 'http://192.168.56.1:9000'  // ← СЮДА ТВОЙ РЕАЛЬНЫЙ IP!
  : 'http://localhost:9000'

export const getServiceImageUrl = (imgPath: string | undefined): string => {
    // Если нет пути - возвращаем дефолтное изображение
    if (!imgPath || imgPath.trim() === '') {
        return import.meta.env.PROD 
            ? '/ASGARFrontend/default-service.jpg'
            : '/default-service.jpg'
    }
    
    // Если уже полный URL - оставляем как есть
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
        return imgPath
    }
    
    // Если путь начинается с /test/ или /uploads/ - это на бэкенд
    if (imgPath.startsWith('/test/') || imgPath.startsWith('/uploads/')) {
        return `${API_BASE}${imgPath}`
    }
    
    // Если это просто имя файла
    if (imgPath.includes('.jpg') || imgPath.includes('.png') || imgPath.includes('.jpeg')) {
        return `${API_BASE}/test/${imgPath}`
    }
    
    // Локальные картинки (в продакшене с префиксом)
    if (import.meta.env.PROD) {
        return `/ASGARFrontend${imgPath}`
    }
    
    return imgPath
}

export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    console.warn('⚠️ Не удалось загрузить изображение:', event.currentTarget.src)
    event.currentTarget.src = import.meta.env.PROD 
        ? '/ASGARFrontend/default-service.jpg'
        : '/default-service.jpg'
    event.currentTarget.onerror = null
}