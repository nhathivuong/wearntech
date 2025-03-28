import { useContext} from "react"
import { AllItemsContext } from "./contexts/AllItemsContext"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

const NavBarItems = ({handleItemNav}) => {
    const {allItems} = useContext(AllItemsContext)
    if(!allItems){
        return <p>Loading items category...</p>
    }
    //finds the unique categories
    const uniqueItemCategories = [... new Set(allItems.map(item => item.category))]
    //finds unique body location
    const uniqueItemBody = [... new Set(allItems.map(item => item.body_location))]
    //sort in alphabetical order
    const categoriesinAlphaOrder = uniqueItemCategories.sort((a,b)=> a.localeCompare(b))
    const bodyInAlphaOrder = uniqueItemBody.sort((a,b) => a.localeCompare(b))

    return(
    <NavDrop>
                <EachFilter to={`/items`} onClick={handleItemNav}><h2>All items</h2></EachFilter>
        <Categories>
        <h2>Categories</h2>
        {categoriesinAlphaOrder.map((category, index) => {
            return <EachFilter key={index} to={`/items?category=${category.toLowerCase()}`} onClick={handleItemNav}>{category}</EachFilter>
            })
        }
        </Categories>
        <Categories>
        <h2>Location</h2>
        {bodyInAlphaOrder.map((location, index) => {
            return <EachFilter key={index} to={`/items?body=${location.toLowerCase()}`} onClick={handleItemNav}>{location}</EachFilter>
            })
        }
        </Categories>
    </NavDrop>
    )
}
const NavDrop = styled.div`
    z-index: 1;
    position:fixed;
    box-sizing: border-box;
    padding: 1em 0 1em 1em;
    display:grid;
    grid-template-columns: 15rem 15rem 15rem;
    width:100%;
    background-color: var(--color-yellow);
    margin: auto;
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
const EachFilter = styled(NavLink)`
    height:fit-content;
    width:fit-content;
    padding: 0;
    text-align:left;
    &:hover{
        text-decoration:underline;
    }
`
const Categories = styled.div`
    width:fit-content;
    display:flex;
    flex-direction:column;
    gap: 5px;
`
export default NavBarItems