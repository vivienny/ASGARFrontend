import { Routes, Route } from 'react-router-dom'
import NavigationBar from './components/NAviation'
import ServicesPage from './pages/AsgarCatalog'
import ServiceDetailPage from './pages/AviaServAbout'
import HomePage from './pages/ASGARhome'
import './App.css'
function App() {
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