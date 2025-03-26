import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AllCompaniesContext } from "../contexts/AllCompaniesContext";
import { AllItemsContext } from "../contexts/AllItemsContext"
import ItemCard from "./ItemCard";

const CompanyPage = () => {
    const { companies } = useContext(AllCompaniesContext);
    const { allItems } = useContext(AllItemsContext);
    const { _id: companyId } = useParams();    

    const [foundCompany, setFoundCompany] = useState({});
    const [itemsFromCompany, setItemsFromCompany] = useState([]);

    useEffect(()=>{
        setFoundCompany(companies.find(company => company._id === companyId))
        setItemsFromCompany(allItems.filter(item => item.companyId === companyId));
    },[companies, allItems])
    
    
    return (
        <>
        {
            foundCompany? (
                <>
                    {/* Company Title section */}
                    <section> 
                        <h2><a href={foundCompany.url} target="_blank">{foundCompany.name}</a></h2>
                        <p>Products made in {foundCompany.country}</p>
                    </section>

                    {/* Products by Company section */}
                    <section>
                        {itemsFromCompany.length > 0 ? (
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