import { useContext} from "react"
import {AllCompaniesContext} from "./contexts/AllCompaniesContext"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

const NavBarCompanies = ({handleCoNav}) => {
    const {companies} = useContext(AllCompaniesContext)
    if(!companies){
        return <p>Loading companies...</p>
    }
    // sort in alphabetical order
    const companiesinAlphaOrder = companies.sort((a,b)=> a.name.localeCompare(b.name))

    return(
    <NavDrop>
    {companiesinAlphaOrder.map(company => {
        return <EachCompany key={company._id} to={`/company/${company._id}`} onClick={handleCoNav}>{company.name}</EachCompany>
        })
    }
    </NavDrop>
    )
}
const NavDrop = styled.div`
    z-index: 1;
    position:fixed ;
    box-sizing: border-box;
    padding: 1em 0 1em 1em;
    display:grid;
    grid-template-rows: repeat(15, 1.5rem);
    grid-template-columns: repeat(5, 15rem);
    gap: 5px;
    grid-auto-flow:column;
    width:100%;
    background-color: var(--color-yellow);
    justify-content: center;
    font-weight: bold;
    animation-name: fade-in;
    animation-duration: 0.5s;
    @keyframes fade-in {
        0% {
            transform-origin: top;
            opacity: 75%;
        }
        100% {
            transform-origin: top;
            opacity: 100%;
            animation-timing-function: ease-in-out;
        }
    }
`
const EachCompany = styled(NavLink)`
    height:fit-content;
    width:fit-content;
    padding: 0;
    text-align:left;
    &:hover{
        text-decoration:underline;
    }
`  
export default NavBarCompanies