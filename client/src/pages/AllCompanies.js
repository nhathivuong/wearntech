import { useContext } from "react"
import { AllCompaniesContext } from "../contexts/AllCompaniesContext"
import { NavLink } from "react-router-dom"
const AllCompanies = () =>{
    const {companies} = useContext(AllCompaniesContext)

    if(!companies){
        return <p>Loading companies...</p>
    }
    // sort in alphabetical order
    const companiesinAlphaOrder = companies.sort((a,b)=> a.name.localeCompare(b.name))
    
    return (<>
        <h1>All Companies</h1>
        {companiesinAlphaOrder.map(company => {
            return <NavLink key={company._id} to={`/company/${company._id}`}>{company.name}</NavLink>
            })
        }
    </>)

}

export default AllCompanies