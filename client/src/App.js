import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./Header"
import Home from "./pages/Home"

const App = () => {
    return <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" />
            <Route path="/company/:_id" />
            <Route path="/items" />
            <Route path="/item/:_id" />
        </Routes>
    </Router>
}

export default App