import React, { useState } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import ServicesList from "../components/Garage/ServicesList";
import DetailField from "../components/Garage/DetailField";

export default function CheckedInVehiclePage() {
  let { checkInId } = useParams();
  const checkIn = useLoaderData();
  const currentGarage = localStorage.getItem("garage_id");
  const token = localStorage.getItem("token");
  const [finalBillItems, setFinalBillItems] = useState(checkIn.bill_items);
  const navigate = useNavigate();

  const handleBillItemsUpdate = (updatedBillItems) => {
    setFinalBillItems(updatedBillItems);
  };

  const saveBill = async (context) => {

    try {
      const res = await fetch(
        "/api/create/bill/items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            billId: checkIn.bill_id,
            billItems: finalBillItems
          }),
        }
      );      

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      if(context === 'Generate') {
        navigate(`/garage/generate-bill/${checkInId}`);
      } else if(context === 'Back') {
        navigate(`/garage/${currentGarage}`);
      }

      // return responseData;
      
    } catch (error) {
      console.error("Error submitting services:", error);
    }
  }

  const handleSaveBill = (context) => {
    saveBill(context);
  }

  return (
    <>
      <div className="mb-8 mt-4">
        <button onClick={() => handleSaveBill('Back')} className="">
          <i className="fas fa-chevron-left"></i> Back to Garage
        </button>
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
          onBillItemsUpdate={handleBillItemsUpdate}

        />
      </section>
      <div className="button-group flex fixed bottom-0 left-0 w-full px-4">
        <button onClick={() => handleSaveBill('Generate')} className="flex-1 btn w-full btn-blue">Generate Bill</button>
      </div>
    </>
  );
}
