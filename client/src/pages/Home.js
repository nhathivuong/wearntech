import { AllItemsContext } from "../contexts/AllItemsContext"
import { useContext } from "react"
import ItemCard from "./ItemCard"

const Home = () => {
    // Getting all items from context
    const {allItems} = useContext(AllItemsContext)
    console.log(allItems)
    return <>
    <div className="homepage">
        <h1>Wear & Tech</h1>
        <h2>Your one stop shop for wearable tech!</h2>
        <div className="featuredItems">
            <p>Featured items</p>
            {allItems === null ? <p>Loading...</p> : <>
            </>}
        </div>
    </div>
    </>
}

export default Home