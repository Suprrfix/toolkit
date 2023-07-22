import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckInVehicleForm() {

  const [formData, setFormData] = useState({
    customer_vehicle_number: "",
    customer_first_name: "",
    customer_last_name: "",
    phone_number: "",
    vehicle_type: "CAR",
    brand: "",
    vehicle_model: "",
    vehicle_variant: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("====FORM===");
    console.log(formData);

    let garage_id = localStorage.getItem("garage_id");

    if(garage_id === 'null') {
      garage_id = 1;
    }

    const customerData = {
      brand: formData.brand,
      firstName: formData.customer_first_name,
      garageId: garage_id,
      lastName: formData.customer_last_name,
      name: formData.vehicle_model,
      phoneNumber: formData.phone_number,
      variant: formData.vehicle_variant,
      vehicleNumber: formData.customer_vehicle_number,
      vehicleType: formData.vehicle_type,
    };

    const token = localStorage.getItem("token");

    try {
      const response1 = await fetch(
        "https://optimus-internal.suprrfix.com/api/v1/create/customer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(customerData),
        }
      );
      const customerDataResponse = await response1.json();
      const response2 = await fetch(
        "https://optimus-internal.suprrfix.com/api/v1/create/check_in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            customerId: customerDataResponse.customer_id,
            customerVehicleId: customerDataResponse.customer_vehicle_id,
            garageId: customerDataResponse.garage_id,
            userId: 1,
          }),
        }
      );
      const checkInResponse = await response2.json();
      navigate(`/garage/check-in/${checkInResponse.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-12">
        <div className="mb-6">
          <label
            htmlFor="customer_vehicle_number"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Registration number
          </label>
          <input
            type="text"
            id="customer_vehicle_number"
            name="customer_vehicle_number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="KA11MH0123"
            value={formData.customer_vehicle_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="customer_first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            First name
          </label>
          <input
            type="text"
            name="customer_first_name"
            id="customer_first_name"
            placeholder="Smith"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.customer_first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="customer_last_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Last name
          </label>
          <input
            type="text"
            name="customer_last_name"
            id="customer_last_name"
            placeholder="Smith"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.customer_last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="phone_number"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            placeholder="+91 9999 99 9999"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="vehicle_type"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Vehicle type:
          </label>
          <select
            name="vehicle_type"
            id="vehicle_type"
            value={formData.vehicle_type}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
          >
            <option value="CAR">Car</option>
            <option value="BIKE">Bike</option>
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="brand"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            placeholder="Honda"
            value={formData.brand}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
            required
          />
          <ul>Suggestions</ul>
        </div>
        <div className="mb-6">
          <label
            htmlFor="vehicle_model"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Model
          </label>
          <input
            type="text"
            name="vehicle_model"
            id="vehicle_model"
            placeholder="City"
            value={formData.vehicle_model}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="vehicle_variant"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Variant
          </label>
          <input
            type="text"
            name="vehicle_variant"
            id="vehicle_variant"
            placeholder="VX"
            value={formData.vehicle_variant}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-blue w-full" type="submit">
          Check-in
        </button>
      </form>
    </>
  );
}
