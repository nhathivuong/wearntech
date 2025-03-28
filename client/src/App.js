import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./Header"
import Home from "./pages/Home"
import CompanyPage from "./pages/CompanyPage"
import ViewItemsPage from "./pages/ViewItemsPage"
import ViewCartPage from "./pages/ViewCartPage"
import AboutPage from "./pages/AboutPage"
import AllCompanies from "./pages/AllCompanies"

const App = () => {
    return <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<AllCompanies/>}/>
            <Route path="/company/:_id" element={<CompanyPage />} />
            <Route path="/items" element={<ViewItemsPage />} />
            <Route path="/item/:_id" />
            <Route path="/cart/:_id" element={<ViewCartPage />} />
            <Route path="/about" element={<AboutPage />} />
        </Routes>
    </Router>
}

export default App