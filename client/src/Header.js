import { HomeIcon, CartIcon, SearchIcon } from "./components/Icons"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

const Header = () => {
    return <StyledNavigationBar>
        <div className="pagesNavigation">
            <NavLink to="/"><HomeIcon /> Home</NavLink>
            <NavLink to="/items">Items</NavLink>
            <NavLink to="/companies">Brands</NavLink>
            </div>
        <div className="searchAndCart">
            <SearchIcon /> <input type="text" />
            <NavLink to="/cart"><CartIcon /></NavLink>
        </div>
    </StyledNavigationBar>
}


// Placeholder for now, will change it later when we get to CSS stuff
const StyledNavigationBar = styled.nav`
    background-color: var(--color-red);
    font-weight: bolder;
    color: var(--color-white);
    display: flex;
    top: 0;
    width: 100%;
    padding: 1.5rem;
    position: sticky;
    margin: 0;
    padding: 1rem 0;
    .pagesNavigation {
        display: inline-block;
        align-items: center;
        text-align: center;
        margin: 0 auto;
        position: relative;
    }
    .searchAndCart{
        display: inline-block;
        margin-left: auto;
        position: absolute;
        right: 0;
        margin: 0 2rem;
}
`

export default Header