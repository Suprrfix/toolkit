import { Link } from "react-router-dom";
import DetailField from "../components/Garage/DetailField";
import BillItemLine from "../components/Garage/BillItemLine";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const currentGarage = localStorage.getItem("garage_id");
const token = localStorage.getItem("token");

//get the garage details
async function getGarageDetails() {

  const res = await fetch(
    `https://optimus-internal.suprrfix.com/api/v1/garage/${currentGarage}/details`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  if (res.status === 403) {
    // Check if the redirect flag is set to prevent infinite redirection loop
    if (!localStorage.getItem("redirectedToLogin")) {
      localStorage.setItem("redirectedToLogin", "true");
      // Redirect the user to the login page
      window.location.href = "/login";
      return Promise.resolve(null); // Return null to indicate that the API call should not proceed
    }
  }

  // Clear the redirect flag when the response is not 403
  localStorage.removeItem("redirectedToLogin");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const garageDetails = await res.json();

  return garageDetails;
}

export default function BillPage() {
    const [garageDetails, setGarageDetails] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        async function fetchGarageDetails() {
          try {
            const details = await getGarageDetails();
            if (details !== null) {
              setGarageDetails(details);
            }
            // Handle other cases if needed (e.g., details === null)
          } catch (error) {
            console.error("Error while fetching garage details:", error);
          }
        }
    
        fetchGarageDetails();
      }, []);

  const checkIn = useLoaderData();
  //fetch the garage details

  let billTotal = checkIn.bill_items.reduce((total, bill_item) => {
    return total + bill_item.price;
  }, 0);

  const handleCheckout = async () => {
    // Perform the /check-out API call here and get the response
    const response = await fetch("https://optimus-internal.suprrfix.com/api/v1/create/check_out", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checkInId: checkIn.check_in_id,
        billId: checkIn.bill_id,
        nextServiceDueDate: "",
      }),
    });

    // Convert the response to JSON
    const data = await response.json();

    // Redirect to the checked-out page with the necessary data as URL parameters
    navigate(`/garage/checked-out/${data.id}?vehicle=${checkIn.vehicle_number}`);
  };


  //compute total of all bill items and store it in a variable

  if (garageDetails === null) {
    // Handle the case where garageDetails is null, such as redirecting to the login page
    return <div>Loading or Redirecting...</div>;
  }

  return (
    <section>
      <div className="notice text-gray-500 bg-yellow-300 text-center py-2 text-xs w-full font-bold mb-4">
        BILL PREVIEW ONLY. NO INVOICE WILL BE GENERATED.
      </div>
      <div className="receipt border border-gray-300 p-4">
        <header className="mb-4 mt-4">
          <h1 className="text-xl dark:text-gray-300">{garageDetails.garage_name}</h1>
          <p>{garageDetails.garage_address} {'-' + garageDetails.garage_pincode}</p>
          <div><i className="fas fa-phone-alt"></i> {garageDetails.owner_phone_number}</div>
        </header>

        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <DetailField label="Customer name" value={`${checkIn.customer_first_name} ${checkIn.customer_last_name}`} />
        <DetailField label="Mobile" value={`+91 ${checkIn.customer_phone_number}`} />
        <DetailField label="Vehicle number" value={checkIn.vehicle_number} />
        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-300"
                      >
                        Services
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-300"
                      >
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-500 dark:divide-gray-700">
                    {checkIn.bill_items.map((bill_item, index) => (
                      <BillItemLine
                        key={`billItem_${index}`}
                        services_name={bill_item.serviceName}
                        services_price={bill_item.price}
                      ></BillItemLine>
                    ))}
                  </tbody>
                  <tfoot className="divide-y-2 divide-gray-500 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 uppercase whitespace-nowrap text-sm text-gray-800 font-bold dark:text-gray-200">
                        Total
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800 dark:text-gray-200">
                        {billTotal}
                      </td>
                    </tr>
                  </tfoot>
                </table>
                {/* <div className="input-group mt-4">
                  <label htmlFor="next_service_date mb-4">
                    Next service date:
                  </label>
                  <input
                    type="text"
                    name="next_service_date"
                    id="next_service_date"
                    className="py-3 px-4 block w-full border border-gray-500 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="button-group flex fixed bottom-0 left-0 w-full px-4">
        <Link to={`/garage/check-in/${checkIn.check_in_id}`} className="flex-1 btn btn-secondary mr-2">
          Go Back
        </Link>
        <button className="flex-1 btn btn-blue" onClick={handleCheckout}>
        Check-out
      </button>
      </div>
    </section>
  );
}
