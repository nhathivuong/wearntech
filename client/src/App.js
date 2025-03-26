import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./Header"
import Home from "./pages/Home"
import CompanyPage from "./pages/CompanyPage"
import ViewItemsPage from "./pages/ViewItemsPage"

const App = () => {
    return <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" />
            <Route path="/company/:_id" element={CompanyPage} />
            <Route path="/items" element={ViewItemsPage} />
            <Route path="/item/:_id" />
        </Routes>
    </Router>
}

export default App