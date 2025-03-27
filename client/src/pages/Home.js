import { AllItemsContext } from "../contexts/AllItemsContext"
import { useContext } from "react"
import ItemCard from "./ItemCard"
import runningpeople from "../imgs/runningpeople.jpg"

const Home = () => {
    // Getting all items from context
    const {allItems} = useContext(AllItemsContext)
    const selectedItems = []

    // Getting a set number of random items from allItems context
    if(allItems !==null){
        const shuffled = allItems.sort(() => 0.5-Math.random())
        const selected = shuffled.slice(0, 10)
        selected.forEach(item => {
            selectedItems.push(item)
        })
    }

    // Arrow buttons
    const scrollContainer = document.querySelector(".individualFeaturedItems")
    const arrowLeft = document.getElementById("arrowLeft")
    const arrowRight = document.getElementById("arrowRight")
    if(allItems !== null){
    arrowRight.addEventListener("click", () => {
        scrollContainer.style.scrollBehavior = "smooth"; 
        scrollContainer.scrollLeft += 375;
    })
    arrowLeft.addEventListener("click", () => {
        scrollContainer.style.scrollBehavior = "smooth"; 
        scrollContainer.scrollLeft -= 375;
    })
    }
    
    return <>
    <img src={runningpeople} className="homepagePhoto"></img>
    <div className="banner">
        <h1>Wear & Tech</h1>
        <div className="homepage"></div>
            <h2>Your one stop shop for wearable tech!</h2>
                <p className="featuredItems">Featured items</p>
                <div className="wrapContainer">
                    <p id="arrowLeft" className="arrows"><i className="arrow left"></i></p>
                        <div className="individualFeaturedItems">
                            {allItems === null ? <p>Loading...</p> : <>
                                {selectedItems.map((selectedItem) => {
                                    return <div className="grid" key={selectedItem._id}><ItemCard item={selectedItem} /></div>
                                })}
                            </>}
                        </div>
                    <p id="arrowRight" className="arrows"><i className="arrow right"></i></p>
                </div>
        </div>
    </>
}

export default Home