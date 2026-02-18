import { Link, useLocation } from 'react-router-dom'
import './Aviacrumbs.css'

interface Crumb {
    label: string
    path?: string
}

const Breadcrumbs = () => {
    const location = useLocation()
    
    // Разбиваем путь на части
    const pathnames = location.pathname.split('/').filter(x => x)
    
    const crumbs: Crumb[] = []
    
    // Всегда добавляем Главную
    crumbs.push({
        path: '/',
        label: 'Главная'
    })
    
    // Обрабатываем остальные части пути
    let currentPath = ''
    pathnames.forEach((value, index) => {
        currentPath += `/${value}`
        
        let label = value
        // Приводим названия к читаемому виду
        if (value === 'services') {
            label = '  Услуги'
        } else if (!isNaN(Number(value))) {
            label = 'Детали услуги'
        } else {
            // Преобразуем "some-page" в "Some Page"
            label = value.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')
        }
        
        crumbs.push({
            path: index === pathnames.length - 1 ? undefined : currentPath,
            label: label
        })
    })

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumbs">
                {crumbs.map((crumb, index) => (
                    <li key={index} className="breadcrumb-item">
                        {crumb.path ? (
                            <Link to={crumb.path}>{crumb.label}</Link>
                        ) : (
                            <span>{crumb.label}</span>
                        )}
                        {index < crumbs.length - 1 && '   '}
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export default Breadcrumbs