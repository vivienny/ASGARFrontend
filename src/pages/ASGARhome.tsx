import { Container, Row, Col } from 'react-bootstrap'
import Breadcrumbs from '../components/Aviacrumbs'
import AviaAccordion from '../components/AccordAvia' // Импортируем новый компонент
import './ASGARhome.css'

const HomePage = () => {
    return (
        <div className="home-page">
           
            
            <div className="hero-section">
                <Container>
                    
                    <Row className="align-items-center min-vh-80">
                        <Col lg={6} className="hero-content">
                        <Breadcrumbs />
                            <h1 className="hero-title">
                                <span className="hero-title-main">ASGAR Avia</span>
                                <span className="hero-title-sub">УСЛУГИ АВИАЦИОННОГО ОБСЛУЖИВАНИЯ</span>
                            </h1>
                           
                           <AviaAccordion />
                        </Col>
                    </Row>
                </Container>
            </div>

           
        </div>
    )
}

export default HomePage