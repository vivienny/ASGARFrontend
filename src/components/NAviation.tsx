import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react' // Добавляем
import { Navbar, Container, Nav } from 'react-bootstrap' // Добавляем
import './NAviation.css'

const NavigationBar = () => {
    const location = useLocation()
    const [expanded, setExpanded] = useState(false) // Для управления бургером

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/'
        if (path === '/services') {
            return location.pathname === '/services' || location.pathname.startsWith('/services/')
        }
        return location.pathname === path
    }

    return (
        <>
            {/* Десктопная версия */}
            <header className="site-header d-none d-lg-block">
                <div className="header-container">
                    <div className="logo">
                        <Link to="/" onClick={() => setExpanded(false)}>
                            <img 
                                src="/public/logo.png" 
                                alt="ASGAR logo" 
                                className="logo-img"
                                onError={(e) => {
                                    e.currentTarget.src = '/default-logo.png'
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

            {/* Мобильная версия - РАСКОММЕНТИРОВАНО */}
            <Navbar 
                expand="lg" 
                className="d-lg-none mobile-navbar"
                expanded={expanded}
                onToggle={() => setExpanded(!expanded)}
            >
                <Container>
                    <Navbar.Brand as={Link} to="/" className="mobile-brand" onClick={() => setExpanded(false)}>
                        <img 
                            src="/public/logo.png" 
                            alt="ASGAR logo" 
                            className="mobile-logo-img"
                            onError={(e) => {
                                e.currentTarget.src = '/default-logo.png'
                            }}
                        />
                        <span className="mobile-company-name">АСГАР</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="mobile-nav" />
                    <Navbar.Collapse id="mobile-nav">
                        <Nav className="ms-auto">
                            <Nav.Link 
                                as={Link} 
                                to="/" 
                                active={isActive('/')}
                                className="mobile-nav-link"
                                onClick={() => setExpanded(false)}
                            >
                                Главная
                            </Nav.Link>
                            <Nav.Link 
                                as={Link} 
                                to="/services" 
                                active={isActive('/services')}
                                className="mobile-nav-link"
                                onClick={() => setExpanded(false)}
                            >
                                Услуги
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavigationBar