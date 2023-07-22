import { Link } from "react-router-dom";
import ServicesList from "../components/Garage/ServicesList";
import DetailField from "../components/Garage/DetailField";
import { useLoaderData, useParams } from "react-router-dom";

export default function CheckedInVehiclePage() {
  let { checkInId } = useParams();

  const checkIn = useLoaderData();
  const currentGarage = localStorage.getItem("garage_id");

  return (
    <>
      <div className="mb-8">
        <Link to={`/garage/${currentGarage}`}>
          <i className="fas fa-long-arrow-left"></i> Back
        </Link>
      </div>
      <h2 className="text-gray-900 dark:text-gray-300 text-md">
        {checkIn.vehicle_number}
      </h2>
      <h1 className="text-gray-900 dark:text-gray-300 text-2xl mb-4">
        {checkIn.customer_first_name} {checkIn.customer_last_name}
      </h1>

      <DetailField
        label="Vehicle details"
        value={`${checkIn.vehicle_brand} ${checkIn.vehicle_model} ${checkIn.vehicle_variant} (${checkIn.vehicle_type})`}
      />
      <DetailField
        label="Mobile"
        value={`+91 ${checkIn.customer_phone_number}`}
      />
      <section className="bg-gray-100 p-4 my-4 dark:bg-gray-700">
        <h3 className="font-bold text-md">Services</h3>
        <ServicesList
          bill_id={checkIn.bill_id}
          bill_items={checkIn.bill_items}
        />
      </section>
      <div className="button-group flex fixed bottom-0 left-0 w-full px-4">
        <Link
          to={`/garage/generate-bill/${checkInId}`}
          className="flex-1 btn w-full btn-blue"
        >
          Generate Bill
        </Link>
      </div>
    </>
  );
}
