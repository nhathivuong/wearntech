import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AllItemsContext } from "./contexts/AllItemsContext"
import {AllCompaniesContext} from "./contexts/AllCompaniesContext"
const NavBarCompanies = () => {
    const {compagnies} = useContext(AllCompaniesContext)

    console.log(compagnies)
    if(!compagnies){
        
    }
    // console.log(compagnies)
    // if(!compagnies){
    //     return <p>Loading companies...</p>
    // }
    return <p>companies</p>
    // return(<>{
    //     compagnies.map(company => {
    //         return <NavLink to="/company/:_id">{company.name}</NavLink>
    //     })
    // }</>)
}
export default NavBarCompanies