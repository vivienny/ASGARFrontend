import { Routes, Route, useNavigate } from 'react-router-dom' // добавил useNavigate
import { useEffect } from 'react' // добавил useEffect
import NavigationBar from './components/NAviation'
import ServicesPage from './pages/AsgarCatalog'
import ServiceDetailPage from './pages/AviaServAbout'
import HomePage from './pages/ASGARhome'
import './App.css'

function App() {
    const navigate = useNavigate() // добавил

    // Добавил useEffect для обработки редиректа с 404.html
    useEffect(() => {
    // Для GitHub Pages: если есть сохранённый путь после 404
    const redirect = sessionStorage.getItem('redirect')
    if (redirect && redirect !== window.location.href) {
        sessionStorage.removeItem('redirect')
        
        // Извлекаем только путь после /ASGARFrontend/
        let path = redirect.replace('https://vivienny.github.io', '')
        path = path.replace('/ASGARFrontend', '')
        
        // Если путь пустой или содержит двойной слеш
        if (!path || path.includes('//')) {
            path = '/'
        }
        
        console.log('🔄 Перенаправление на:', path)
        navigate(path)
    }
}, [navigate])

    return (
        <>
            <NavigationBar />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />          {/* ← ГЛАВНАЯ */}
                    <Route path="/services" element={<ServicesPage />} />  {/* ← УСЛУГИ */}
                    <Route path="/services/:id" element={<ServiceDetailPage />} />
                </Routes>
            </div>
        </>
    )
}

export default App