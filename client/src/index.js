import ReactDOM from "react-dom/client";
import App from "./App";
import AllItemsProvider from "./contexts/AllItemsContext";
import AllCompaniesProvider from "./contexts/AllCompaniesContext";
import UserProvider from "./contexts/UsersContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AllCompaniesProvider>
        <AllItemsProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </AllItemsProvider>
    </AllCompaniesProvider>
);