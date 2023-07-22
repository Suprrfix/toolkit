import { Link } from "react-router-dom";
import DetailField from "../components/Garage/DetailField";
import BillItemLine from "../components/Garage/BillItemLine";
import { useLoaderData } from "react-router-dom";

//get the garage details
// async function getGarageDetails() {

//   const currentGarage = localStorage.getItem("garage_id");
//   const token = localStorage.getItem("token");

//   const res = await fetch(
//     `http://localhost:9094//api/v1/garage/${currentGarage}/details`,
//     {
//       cache: "no-store",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   const garageDetails = await res.json();

//   return garageDetails;
// }

// const garageDetails = getGarageDetails();

export default function BillPage() {

    // console.log(garageDetails);

  const checkIn = useLoaderData();
  //fetch the garage details

  //fetch the bill items

  //compute total of all bill items and store it in a variable

  return (
    <section>
      <div className="notice text-gray-500 bg-yellow-300 text-center py-2 text-xs w-full font-bold mb-4">
        BILL PREVIEW ONLY. NO INVOICE WILL BE GENERATED.
      </div>
      <div className="receipt border border-gray-300 p-4">
        <header className="mb-4 mt-4">
          <h1 className="text-xl dark:text-gray-300">Anwar Garage</h1>
          <p>11 Evening Street, Old Madras Road, Bengaluru, Karnataka</p>
          <div>+91 91232 02391</div>
        </header>

        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <DetailField label="Customer name" value="Mahesh Raghavan" />
        <DetailField label="Mobile" value="+91 97200 09230" />
        <DetailField label="Vehicle number" value="KA 11 MH 2310" />
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
                        uniqueID={index + 1}
                        services_name={bill_item.services_name}
                        services_price={bill_item.services_price}
                      ></BillItemLine>
                    ))}
                  </tbody>
                  <tfoot className="divide-y-2 divide-gray-500 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 uppercase whitespace-nowrap text-sm text-gray-800 font-bold dark:text-gray-200">
                        Total
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800 dark:text-gray-200">
                        4500
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <div className="input-group mt-4">
                  <label htmlFor="next_service_date mb-4">
                    Next service date:{" "}
                  </label>
                  <input
                    type="date"
                    name="next_service_date"
                    id="next_service_date"
                    className="py-3 px-4 block w-full border border-gray-500 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="button-group flex fixed bottom-0 left-0 w-full px-4">
        <Link href="/garage/update/1" className="flex-1 btn btn-secondary mr-2">
          Go Back
        </Link>
        <Link href="/garage/bill" className="flex-1 btn btn-blue">
          Confirm
        </Link>
      </div>
    </section>
  );
}
