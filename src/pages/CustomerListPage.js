import React, { useState } from "react";
import MainNavigation from "../components/common/MainNavigation";
// import { useLoaderData } from "react-router-dom";
import CustomerList from "../components/Customer/CustomerList";

export default function CustomerListPage() {
    const customerList = [
        {
          customer_name: "Audrey Crooks",
          customer_mobile_number: "981.681.2569 x4456",
          Car: "Smart Alpine",
          id: "1",
        },
        {
          customer_name: "Sean Emmerich",
          customer_mobile_number: "1-689-582-5151 x6141",
          Car: "Chevrolet Element",
          id: "2",
        },
        {
          customer_name: "Spencer Hahn Jr.",
          customer_mobile_number: "(201) 362-2002 x363",
          Car: "Bentley Durango",
          id: "3",
        },
        {
          customer_name: "Mrs. Bessie Ruecker DDS",
          customer_mobile_number: "669.773.7129 x3479",
          Car: "Maserati Model Y",
          id: "4",
        },
        {
          customer_name: "Kara Thiel",
          customer_mobile_number: "282.680.0079 x4118",
          Car: "Mercedes Benz Corvette",
          id: "5",
        },
        {
          customer_name: "Shawn Stoltenberg",
          customer_mobile_number: "292.610.4837",
          Car: "Maserati XC90",
          id: "6",
        },
        {
          customer_name: "Candice Durgan",
          customer_mobile_number: "(454) 756-2247 x3321",
          Car: "Chrysler PT Cruiser",
          id: "7",
        },
        {
          customer_name: "Mrs. Francis Bernier",
          customer_mobile_number: "278-447-8898 x21501",
          Car: "BMW Challenger",
          id: "8",
        },
        {
          customer_name: "Jesus Heaney",
          customer_mobile_number: "1-467-363-6631 x18665",
          Car: "Rolls Royce Volt",
          id: "9",
        },
        {
          customer_name: "Dean Wisozk",
          customer_mobile_number: "1-450-906-9560 x45575",
          Car: "Ferrari XTS",
          id: "10",
        },
        {
          customer_name: "Allan Pfeffer",
          customer_mobile_number: "537-462-2610",
          Car: "Kia Malibu",
          id: "11",
        },
        {
          customer_name: "Andrew Senger",
          customer_mobile_number: "777.613.0589 x1681",
          Car: "Dodge Camaro",
          id: "12",
        },
        {
          customer_name: "Warren Senger",
          customer_mobile_number: "1-834-770-0612 x48646",
          Car: "Smart Model 3",
          id: "13",
        },
        {
          customer_name: "Arthur Cremin",
          customer_mobile_number: "454.476.1325 x91835",
          Car: "Dodge Countach",
          id: "14",
        },
        {
          customer_name: "Ryan Cremin",
          customer_mobile_number: "440-556-1044 x653",
          Car: "Hyundai Model S",
          id: "15",
        },
      ];
    
  //   const customerList = useLoaderData();
  const [search, setSearch] = useState('');
  const [filteredCustomerList, setFilteredCustomerList] = useState(customerList);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      // If search term is empty, show the full customer list
      setFilteredCustomerList(customerList);
    } else {
      const filteredList = customerList.filter(
        (customer) =>
          customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.Car.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomerList(filteredList);
    }
  };

  // Update the filtered customer list whenever the search term changes
  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    handleSearch(searchTerm);
  };

  return (
    <>
      <form className="mt-4">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <i className="far fa-search"></i>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by name or RC"
            value={search}
            onChange={handleChange}
            required
          />
        </div>
      </form>

      {filteredCustomerList.length > 0 ? (
        <div className="mt-4">
          <CustomerList customers={filteredCustomerList} />
        </div>
      ) : (
        <div className="text-center mt-48">
          <i className="fas fa-cars text-4xl"></i> <p>No customers found.</p>
        </div>
      )}

      <MainNavigation />
    </>
  );
}
