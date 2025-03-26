import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./Header"

const App = () => {
    return <Router>
        <Header />
        <Routes>
            <Route path="/" />
            <Route path="/companies" />
            <Route path="/company/:_id" />
            <Route path="/items" />
            <Route path="/item/:_id" />
        </Routes>
    </Router>
}

export default App