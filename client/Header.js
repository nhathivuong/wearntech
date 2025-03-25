import { HomeIcon, CartIcon, SearchIcon } from "./src/components/Icons"
import { NavLink } from "react-router-dom"

const Header = () => {
    return <StyledNavigationBar>
        <NavLink to="/"><HomeIcon />Home</NavLink>
        <NavLink to="/items">Items</NavLink>
        <NavLink to="/companies">Brands</NavLink>
        <SearchIcon /> <input type="text" />
        <NavLink to="/cart"><CartIcon /></NavLink>
    </StyledNavigationBar>
}


// Placeholder for now, will change it later when we get to CSS stuff
const StyledNavigationBar = styled.nav`
    background-color: #02010a;
    color: white;
    top: 0;
    width: 100%;
    padding: 1.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: sticky;
`

export default Header