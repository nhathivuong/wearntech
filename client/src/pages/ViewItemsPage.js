import { useContext, useEffect, useState } from "react";
import { AllItemsContext } from "../contexts/AllItemsContext"
import { AllCompaniesContext } from "../contexts/AllCompaniesContext";
import ItemCard from "./ItemCard";
import { NavLink, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const ViewItemsPage = () => {
  const {allItems}  = useContext(AllItemsContext);
  const {companies} = useContext(AllCompaniesContext)
  const location = useLocation()
  const [filter, setFilter] = useState(()=> (item) => true)
   // Pagination state
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 20; // Number of items per page
 

  //extracts information from the query
  const filters = new URLSearchParams(location.search)
  const category = filters.get("category")
  const bodyLocation = filters.get("body")
  const company = filters.get("company")
  
  // Getting all company names for the filter buttons
  if(!companies){
      return <p>Loading companies...</p>
  }
  // sort in alphabetical order
  const companiesinAlphaOrder = companies.sort((a,b)=> a.name.localeCompare(b.name))
  

  //sets the filters for the array.filter() for the display of items
  useEffect(()=> {
      setFilter(()=>(item)=> {
        // checks if the filter is applied
        const categoryFilter = !category || item.category.toLowerCase() === category
        const bodyFilter = !bodyLocation || item.body_location.toLowerCase() === bodyLocation
        const companyFilter = !company || item.companyId === Number(company)
        const under20Filter = parseFloat(item.price.replace("$","")) < 20
        const under50Filter = parseFloat(item.price.replace("$","")) < 50
        const under100Filter = parseFloat(item.price.replace("$","")) < 50
        return categoryFilter && bodyFilter && companyFilter && under20Filter && under50Filter && under100Filter
      })
    },[category, bodyLocation, company])
  
    if(!allItems){
      return <p>Loading items...</p>
    }
    //finds the unique categories
    const uniqueItemCategories = [... new Set(allItems.map(item => item.category))]
    //finds unique body location
    const uniqueItemBody = [... new Set(allItems.map(item => item.body_location))]

    //sort in alphabetical order
    const categoriesinAlphaOrder = uniqueItemCategories.sort((a,b)=> a.localeCompare(b))
    const bodyInAlphaOrder = uniqueItemBody.sort((a,b) => a.localeCompare(b))

// Paginate items: Determine the index of the first and last items for the current page
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = allItems.filter(filter).slice(indexOfFirstItem, indexOfLastItem);
  
// Calculate total pages
const totalPages = Math.ceil(allItems.filter(filter).length / itemsPerPage);

 // Handle page changes
 const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // getting the company name for the h2
  const companyName = companies.find((individualCo) => individualCo.companyId === company)
  console.log(companyName)
  return (
    <div>
      <h1>Products</h1>
      {(category || bodyLocation || companyName) &&
      <h2>{`${category || ""} ${bodyLocation || ""} ${companyName || ""}`}</h2>
      }
      <div className="section">
        <div className="filterSection">
          <p className="filterTitle">Filter by:</p>
          <h2>Company</h2>
          <div className="companyFilter">
          {companiesinAlphaOrder.map((company) => {
            return <Filter key={company._id} to={`/items?company=${company._id}`}><p>{company.name}</p></Filter>
          })}
          </div>
          <h2>Category</h2>
          {allItems === null ? <></> : <div className="categoryAndLocationFilter">
            {categoriesinAlphaOrder.map((category) => {
              return <Filter key={category} to={`/items?category=${category.toLowerCase()}`}>{category}</Filter>
            })}
            </div>
            }
          <h2>Placement</h2>
          {allItems === null ? <></> : <div className="categoryAndLocationFilter">
            {bodyInAlphaOrder.map((body) => {
              return <Filter key={body} to={`/items?body=${body.toLowerCase()}`}>{body}</Filter>
            })}
            </div>}
        </div>
        <div className="item-grid">
          {(allItems.length > 0) ? (
              allItems.filter(filter).map((item) => (
                <ItemCard key={item._id} item={item}/>
                ))
            ) : (
              <p>No items available</p>
            )
          }
        </div>
          {/* Pagination Controls */}
          <div className="pagination-controls">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
const Filter = styled(NavLink)`
  padding:0;
  display:flex;
  flex-direction:column;
  &:hover{
      text-decoration:underline;
  }
`  
export default ViewItemsPage;