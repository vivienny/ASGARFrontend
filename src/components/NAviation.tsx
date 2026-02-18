
import { Link, useLocation } from 'react-router-dom'
//import { ROUTES } from '../routes.ts' // или из вашего Routes.ts
import './NAviation.css'

const NavigationBar = () => {
    const location = useLocation()

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/'
        if (path === '/services') {
            return location.pathname === '/services' || location.pathname.startsWith('/services/')
        }
        return location.pathname === path
    }

    return (
        <>
            {/* Десктопная версия - ТОЧНАЯ КОПИЯ из старого проекта */}
            <header className="site-header d-none d-lg-block">
                <div className="header-container">
                    <div className="logo">
                        <Link to="/">
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

            {/* Мобильная версия - React Bootstrap с нашими стилями 
            <Navbar expand="lg" className="d-lg-none mobile-navbar">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="mobile-brand">
                        <img 
                            src="/resources/img/logo.png" 
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
                            >
                                Главная
                            </Nav.Link>
                            <Nav.Link 
                                as={Link} 
                                to="/services" 
                                active={isActive('/services')}
                                className="mobile-nav-link"
                            >
                                Услуги
                            </Nav.Link>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>*/}
        </>
    )
}

export default NavigationBar