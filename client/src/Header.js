import { HomeIcon, CartIcon, SearchIcon } from "./components/Icons"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import NavBarCompanies from "./NavBarCompanies"
import { useState } from "react"

const Header = () => {
    const [coNavOpen, setCoNavOpen] = useState(false)
    const [itemNavOpen, setItemNavOpen] = useState(false)

    const handleCoNav = () =>{
        setCoNavOpen(!coNavOpen)
    }
    const handleItemNav = () =>{
        setItemNavOpen(!itemNavOpen)
    }
    const closeNav = () =>{
        setCoNavOpen(false);
        setItemNavOpen(false)
    }
    return <><StyledNavigationBar>
        <div className="pagesNavigation">
            <NavLink to="/" onClick={closeNav}><HomeIcon/> Home</NavLink>
            <NavLink onClick={handleItemNav}>Items</NavLink>
            <NavLink onClick={handleCoNav}>Brands</NavLink>
        </div>
        <div className="searchAndCart">
            <SearchIcon /> <input type="text" onClick={closeNav}/>
            <NavLink to="/cart"  onClick={closeNav}><CartIcon /></NavLink>
        </div>
    </StyledNavigationBar>
    {coNavOpen && <NavBarCompanies handleCoNav={handleCoNav}/>}
    </>
}


// Placeholder for now, will change it later when we get to CSS stuff
const StyledNavigationBar = styled.nav`
    background-color: var(--color-red);
    font-weight: bolder;
    color: var(--color-white);
    display: flex;
    top: 0;
    width: 100%;
    height:25px;
    padding: 1.5rem;
    position: sticky;
    margin: 0;
    padding: 1rem 0;
    a{
        color: var(--color-white);
    }
    .pagesNavigation {
        display: inline-block;
        align-items: center;
        text-align: center;
        margin: 0 auto;
        position: relative;
    }
    .searchAndCart{
        display:flex;
        align-items:center;
        margin-left: auto;
        position: absolute;
        right: 0;
        margin: 0 2rem;
}
`
export default Header