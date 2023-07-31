import React, { useState } from "react";
import MainNavigation from "../components/common/MainNavigation";
import { useLoaderData } from "react-router-dom";
import CustomerList from "../components/Customer/CustomerList";

export default function CustomerListPage() {
  const customerList = useLoaderData();
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
          customer.customer_vehicle.toLowerCase().includes(searchTerm.toLowerCase())
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
