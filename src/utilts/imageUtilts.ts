/**
 * Утилита для обработки изображений услуг
 * Согласно методичке: API возвращает разные форматы для списка и детальной страницы
 */

/**
 * Преобразует путь к изображению в полный URL
 * @param imgPath - путь с бэкенда (может быть полным URL или относительным)
 * @returns Полный URL для изображения
 */
export const getServiceImageUrl = (imgPath: string | undefined): string => {
    // Если нет пути - возвращаем дефолтное изображение
    if (!imgPath || imgPath.trim() === '') {
        return '/default-service.jpg'
    }
    
    // Если уже полный URL (как в каталоге)
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
        return imgPath
    }
    
    // Если путь начинается с /test/ (как в детальной странице по методичке)
    if (imgPath.startsWith('/test/')) {
        return `http://localhost:9000${imgPath}`
    }
    
    // Если это просто имя файла
    if (imgPath.includes('.jpg') || imgPath.includes('.png') || imgPath.includes('.jpeg')) {
        return `http://localhost:9000/test/${imgPath}`
    }
    
    // Если путь начинается с /uploads/
    if (imgPath.startsWith('/uploads/')) {
        return `http://localhost:9000${imgPath}`
    }
    
    // Для других случаев возвращаем как есть
    return imgPath
}

/**
 * Обработчик ошибок загрузки изображения
 * @param event - событие ошибки
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    console.warn('⚠️ Не удалось загрузить изображение:', event.currentTarget.src)
    event.currentTarget.src = '/default-service.jpg'
    event.currentTarget.onerror = null // Предотвращаем бесконечный цикл
}