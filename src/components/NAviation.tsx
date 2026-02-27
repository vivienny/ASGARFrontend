import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import './NAviation.css'

const NavigationBar = () => {
    const location = useLocation()
    const [expanded, setExpanded] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 992)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/'
        if (path === '/services') {
            return location.pathname === '/services' || location.pathname.startsWith('/services/')
        }
        return location.pathname === path
    }

    const getImagePath = (path: string) => {
    // Для продакшена ищем в assets
    return import.meta.env.PROD ? `/assets${path}` : path
}

    // Если не мобилка - показываем десктопную шапку
    if (!isMobile) {
        return (
            <header className="site-header">
                <div className="header-container">
                    <div className="logo">
                        <Link to="/">
                            <img 
                                src={getImagePath('/logo.png')} 
                                alt="ASGAR logo" 
                                className="logo-img"
                                onError={(e) => {
                                    e.currentTarget.src = getImagePath('/default-service.jpg')
                                }}
                            />
                            <span className="company-name">АСГАР</span>
                        </Link>
                    </div>
                    <nav className="main-nav">
                        <Link to="/" className={isActive('/') ? 'active' : ''}>
                            Главная
                        </Link>
                        <Link to="/services" className={isActive('/services') ? 'active' : ''}>
                            Услуги
                        </Link>
                    </nav>
                </div>
            </header>
        )
    }

    // Мобильная версия
    return (
       <Navbar 
    expand={false}
    className="mobile-navbar"
    expanded={expanded}
>
    <Container fluid>
        <Navbar.Brand as={Link} to="/" className="mobile-brand" onClick={() => setExpanded(false)}>
            <img 
                src={getImagePath('/logo.png')} 
                alt="ASGAR logo" 
                className="mobile-logo-img"
                onError={(e) => {
                    e.currentTarget.src = getImagePath('/default-service.jpg')
                }}
            />
            <span className="mobile-company-name">АСГАР</span>
        </Navbar.Brand>
        
        {/* Ручная кнопка бургера */}
        <button 
            onClick={() => setExpanded(!expanded)}
            className="navbar-toggler"
            type="button"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        
        {expanded && (
    <div className="mobile-menu-dropdown">
        <Nav className="flex-column">
            <Nav.Link 
                as={Link} 
                to="/" 
                className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => setExpanded(false)}
            >
                Главная
            </Nav.Link>
            <Nav.Link 
                as={Link} 
                to="/services" 
                className={`mobile-nav-link ${isActive('/services') ? 'active' : ''}`}
                onClick={() => setExpanded(false)}
            >
                Услуги
            </Nav.Link>
        </Nav>
    </div>
)}
    </Container>
</Navbar>
    )
}

export default NavigationBar