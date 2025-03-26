import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AllCompaniesContext } from "../contexts/AllCompaniesContext";
import { AllItemsContext } from "../contexts/AllItemsContext"
import ItemCard from "./ItemCard";

const CompanyPage = () => {
    const { companies } = useContext(AllCompaniesContext);
    const { allItems } = useContext(AllItemsContext);
    const { _id: companyId } = useParams();    

    let foundCompany = null;
    let itemsFromCompany = [];
    
    if ( companies.length > 0 && allItems!==null ) {
        foundCompany = (companies.find(company => company._id === Number(companyId))) 
        itemsFromCompany = (allItems.filter(item => item.companyId === Number(companyId)))
    }

    return (
        <>
        {
            foundCompany? (
                <>
                    {/* Company Title section */}
                    <section> 
                        <p><a href={foundCompany.url} target="_blank">{foundCompany.name}</a></p>
                        <p>Products made in {foundCompany.country}</p>
                    </section>

                    {/* Products by Company section */}
                    <section>
                        {itemsFromCompany.length > 0 && allItems ? (
                            itemsFromCompany.map((item) => (
                                <ItemCard key={item._id} item={item}/>
                            ))
                        ) : (
                            <p>No products found for this company.</p>
                        )}
                    </section>
                </>
            ) : (
                <p>Loading Company Info...</p>
            )
        }
        </>
    )
}

export default CompanyPage;