import ReactDOM from "react-dom/client";
import App from "./App";
import AllItemsProvider from "./contexts/AllItemsContext";
import AllCompaniesProvider from "./contexts/AllCompaniesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AllCompaniesProvider>
        <AllItemsProvider>
            <App />
        </AllItemsProvider>
    </AllCompaniesProvider>
);