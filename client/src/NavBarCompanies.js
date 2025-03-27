import { useContext} from "react"
import {AllCompaniesContext} from "./contexts/AllCompaniesContext"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

const NavBarCompanies = ({handleCoNav}) => {
    const {companies} = useContext(AllCompaniesContext)
    if(!companies){
        return <p>Loading companies...</p>
    }
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
    position:absolute;
    box-sizing: border-box;
    padding: 1em 0 1em 1em;
    display:grid;
    grid-template-rows: repeat(13, auto);
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;
    grid-auto-flow:column;
    width:100%;
    background-color: var(--color-yellow);
`
const EachCompany = styled(NavLink)`
    height:fit-content;
    width:fit-content;
    padding: 0;
    text-align:left;
`  
export default NavBarCompanies