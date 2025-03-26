import { AllItemsContext } from "../contexts/AllItemsContext"
import { useContext } from "react"
import ItemCard from "./ItemCard"

const Home = () => {
    // Getting all items from context
    const {allItems} = useContext(AllItemsContext)
    const selectedItems = []

    // Getting a set number of random items from allItems context
    if(allItems !==null){
        const shuffled = allItems.sort(() => 0.5-Math.random())
        const selected = shuffled.slice(0, 6)
        selected.forEach(item => {
            selectedItems.push(item)
        })
    }
    
    return <>
    <div className="homepage">
        <h1>Wear & Tech</h1>
        <h2>Your one stop shop for wearable tech!</h2>
        <div className="featuredItems">
            <p>Featured items</p>
            <div className="individualFeaturedItems">
                {allItems === null ? <p>Loading...</p> : <>
                {selectedItems.map((selectedItem) => {
                    return <ItemCard key={selectedItem._id} item={selectedItem} />
                })}
                </>}
            </div>
        </div>
    </div>
    </>
}

export default Home