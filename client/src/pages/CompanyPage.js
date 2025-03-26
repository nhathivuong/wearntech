import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AllCompaniesContext } from "../contexts/AllCompaniesContext";
import { AllItemsContext } from "../contexts/AllItemsContext"

const CompanyPage = () => {
    const { companies } = useContext(AllCompaniesContext);
    const { allItems } = useContext(AllItemsContext);
    const { companyId: _id } = useParams();

    const foundCompany = companies ? companies.find(company => company._id === companyId) : null;

    return (
        <>
        {
            foundCompany ? (
                <>
                    {/* Company Title section */}
                    <section> 
                        <h2><a href={foundCompany.url} target="_blank">{foundCompany.name}</a></h2>
                        <p>Products made in {foundCompany.country}</p>
                    </section>
                    {/* Products by Company section */}
                    <section>
                        
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