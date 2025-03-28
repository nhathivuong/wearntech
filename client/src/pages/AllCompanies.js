import { useContext } from "react"
import { AllCompaniesContext } from "../contexts/AllCompaniesContext"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
const AllCompanies = () =>{
    const {companies} = useContext(AllCompaniesContext)

    if(!companies){
        return <p>Loading companies...</p>
    }
    // sort in alphabetical order
    const companiesinAlphaOrder = companies.sort((a,b)=> a.name.localeCompare(b.name))

    return (<>
        <h1>All Companies</h1>
        <CompaniesGrid>
        {companiesinAlphaOrder.map(company => {
            return <Company key={company._id} to={`/company/${company._id}`}>{company.name}</Company>
            })
        }
        </CompaniesGrid>
    </>)

}
const CompaniesGrid = styled.div`
    display:grid;
    grid-template-rows: repeat(15, 1.5rem);
    grid-template-columns: repeat(5, 17rem);
    grid-auto-flow:column;
    gap: 5px;
    justify-content: center;
`
const Company = styled(NavLink)`
    padding:0;
    &:hover{
        text-decoration: underline;
        font-weight:bold;
    }
`
export default AllCompanies