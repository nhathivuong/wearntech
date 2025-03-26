import { HomeIcon, CartIcon, SearchIcon } from "./components/Icons"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

const Header = () => {
    return <StyledNavigationBar>
        <div class="pagesNavigation">
            <NavLink to="/"><HomeIcon />Home</NavLink>
            <NavLink to="/items">Items</NavLink>
            <NavLink to="/companies">Brands</NavLink>
        <div class="searchAndCart">
            <SearchIcon /> <input type="text" />
            <NavLink to="/cart"><CartIcon /></NavLink>
        </div>
        </div>
    </StyledNavigationBar>
}


// Placeholder for now, will change it later when we get to CSS stuff
const StyledNavigationBar = styled.nav`
    background-color: #02010a;
    color: white;
    top: 0;
    max-width: 100%;
    padding: 1.5rem;
    position: sticky;
    margin: 0;
    padding: 1rem 0;
    .pagesNavigation {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin: 0 1rem;
    }
    .searchAndCart{
        display: flex;
        justify-content: flex-end;
    }
`

export default Header