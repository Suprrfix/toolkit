import React, { useState } from "react";

const ServiceList = ({ bill_id, bill_items }) => {
  const [serviceLines, setServiceLines] = useState(bill_items);

  const handleServiceNameChange = (index, event) => {
    const { value } = event.target;
    const updatedServiceLines = [...serviceLines];
    updatedServiceLines[index].services_name = value;
    setServiceLines(updatedServiceLines);
  };

  const handleServicePriceChange = (index, event) => {
    const { value } = event.target;
    const updatedServiceLines = [...serviceLines];
    updatedServiceLines[index].services_price = parseFloat(value);
    setServiceLines(updatedServiceLines);
  };

  const addServiceLine = () => {
    setServiceLines([
      ...serviceLines,
      { services_name: "", services_price: 0 },
    ]);
  };

  const deleteServiceLine = (index) => {
    const updatedServiceLines = [...serviceLines];
    updatedServiceLines.splice(index, 1);
    setServiceLines(updatedServiceLines);
  };

  const handleBlur = (index) => {
    const serviceData = serviceLines[index];
    handleSubmit(serviceData);
  };

  const handleSubmit = async (serviceData) => {
    const token = localStorage.getItem("token");
    
    try {
    
      const res = await fetch("https://optimus-internal.suprrfix.com/api/v1/create/bill/items", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({billId: bill_id, price: serviceData.services_price, serviceName:serviceData.services_name})
        }
      );
    
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
    
      return res.json();

    } catch (error) {
      console.error("Error submitting services:", error);
    }
  };

  return (
    <div>
      {serviceLines.map((serviceLine, index) => (
        <div key={index} className="flex items-center my-2">
          <input
            className="py-3 px-4 mr-2 w-3/5 border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
            type="text"
            value={serviceLine.services_name}
            onChange={(event) => handleServiceNameChange(index, event)}
            placeholder="Service Name"
          />
          <input
            className="py-3 px-4 w-1/5 mr-2 border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
            type="number"
            value={serviceLine.services_price}
            onChange={(event) => handleServicePriceChange(index, event)}
            onBlur={() => handleBlur(index)}
            placeholder="0.00"
          />
          <button onClick={() => deleteServiceLine(index)}>
            <i className="w-10 fas fa-trash-alt"></i>
          </button>
        </div>
      ))}
      <button onClick={addServiceLine}>
        <i className="fas fa-plus"></i> Add service
      </button>
    </div>
  );
};

export default ServiceList;
