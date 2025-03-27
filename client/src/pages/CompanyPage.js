import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AllItemsContext } from "../contexts/AllItemsContext"
import ItemCard from "./ItemCard";

const CompanyPage = () => {
    const { allItems } = useContext(AllItemsContext);
    const { _id: companyId } = useParams();
    const [ company, setCompany ] = useState(null);

    useEffect(() => {
        const fetchCompany = async () => {
            const response = await fetch(`/company/${companyId}`);
            const { data } = await response.json();
            setCompany(data);
        };
        fetchCompany();
    }, []);

    let itemsFromCompany = [];
    
    if (company && allItems) {
        itemsFromCompany = (allItems.filter(item => item.companyId === Number(companyId)))
    }

    return (
        <>
        {
            company? (
                <>
                    {/* Company Title section */}
                    <section> 
                        <p><a href={company.url} target="_blank">{company.name}</a></p>
                        <p>Products made in {company.country}</p>
                    </section>

                    {/* Products by Company section */}
                    <section>
                        {
                            allItems? (
                                itemsFromCompany.length > 0? (
                                    itemsFromCompany.map((item) => (
                                        <ItemCard key={item._id} item={item}/>
                                    ))
                                ) : (
                                    <p>No products found for this company.</p>
                                )
                            ) : (
                                <p>Loading products from {company.name}...</p>
                            )
                        }
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