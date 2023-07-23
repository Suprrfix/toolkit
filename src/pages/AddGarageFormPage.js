import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddGarageFormPage() {

    /* 

    first call
    
  "address": "Labne Road, Shawarma Nagar, Dilawar, Maharashtra",
  "name": "Thomson Auto Works",
  "pinCode": "560056"



    second call

 "firstName": "Anwar",
  "garageId": "1",
  "lastName": "Rasheed",
  "phoneNumber": "9769787509",
  "privilegedUserId": "1"
    
    
    
    */

  const navigate = useNavigate();
 
    const [formData, setFormData] = useState({
        garage_name: "",
        garage_address: "",
        garage_pincode: "",
        owner_phone_number: "",
        owner_first_name: "",
        owner_last_name: "",
        owner_password: ""
      });
    
      
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("====FORM===");
        console.log(formData);

    
        const garageData = {
          name: formData.garage_name,
          address: formData.garage_address,
          pinCode: formData.garage_pincode
        };

        const ownerData = {
            firstName: formData.owner_first_name,
            lastName: formData.owner_last_name,
            phoneNumber: formData.owner_phone_number,
            password: formData.owner_password
        }
    
        const token = localStorage.getItem("token");
    
        try {
          const response1 = await fetch(
            "http://localhost:9094/api/v1/create/garage",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(garageData),
            }
          );
          const garageDataResponse = await response1.json();
          const response2 = await fetch(
            "http://localhost:9094/api/v1/create/owner",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                garageId: garageDataResponse.id,
                ...ownerData
              }),
            }
          );
          const garageAdded = await response2.json();

          if(garageAdded !== null) {
            navigate('/garages');
          } else {
            navigate('/error');
          }

          
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
                htmlFor="garage_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Garage Name
              </label>
              <input
                type="text"
                id="garage_name"
                name="garage_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Perfect Auto Works"
                value={formData.garage_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="garage_address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Address
              </label>
              <input
                type="text"
                id="garage_address"
                name="garage_address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="123 Main Road, Bengaluru"
                value={formData.garage_address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="garage_pincode"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Pincode
              </label>
              <input
                type="text"
                id="garage_pincode"
                name="garage_pincode"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="560043"
                value={formData.garage_pincode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="owner_first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Owner first name
              </label>
              <input
                type="text"
                id="owner_first_name"
                name="owner_first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Manjunath"
                value={formData.owner_first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="owner_last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Owner last name
              </label>
              <input
                type="text"
                id="owner_last_name"
                name="owner_last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Kumaraswamy"
                value={formData.owner_last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="owner_phone_number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Phone number
              </label>
              <input
                type="text"
                id="owner_phone_number"
                name="owner_phone_number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="9819010101"
                value={formData.owner_phone_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="owner_password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Password:
              </label>
              <input
                type="text"
                id="owner_password"
                name="owner_password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="abc@123"
                value={formData.owner_password}
                onChange={handleChange}
                required
              />
            </div>
            <button className="btn btn-blue w-full" type="submit">
              Add Garage
            </button>
          </form>
        </>
      );
    
}

