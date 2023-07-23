import React, { useState } from "react";

const ServiceList = ({ bill_id, bill_items, onBillItemsUpdate }) => {
  const [serviceLines, setServiceLines] = useState(bill_items);

  const handleServiceNameChange = (index, event) => {
    const { value } = event.target;
    const updatedServiceLines = [...serviceLines];
    updatedServiceLines[index].serviceName = value;
    setServiceLines(updatedServiceLines);
  };

  const handleServicePriceChange = (index, event) => {
    const { value } = event.target;
    const parsedValue = parseFloat(value);
    const updatedServiceLines = [...serviceLines];
    if (!isNaN(parsedValue)) {
      updatedServiceLines[index].price = parsedValue;
    } else {
      // If the value is not a valid number, set it to 0 or any default value
      updatedServiceLines[index].price = 0;
    }

    setServiceLines(updatedServiceLines);
    onBillItemsUpdate(updatedServiceLines);
  };

  const addServiceLine = () => {
    setServiceLines([
      ...serviceLines,
      { serviceName: "", price: 0 },
    ]);
  };

  const deleteServiceLine =  (index) => {
    const updatedServiceLines = [...serviceLines];
    updatedServiceLines.splice(index, 1);
    setServiceLines(updatedServiceLines);
    onBillItemsUpdate(updatedServiceLines);
  };

  return (
    <div>
      {serviceLines.map((serviceLine, index) => (
        <div key={index} className="flex items-center my-2">
          <input
            className="py-3 px-4 mr-2 w-3/5 border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
            type="text"
            value={serviceLine.serviceName}
            onChange={(event) => handleServiceNameChange(index, event)}
            placeholder="Service Name"
          />
          <input
            className="py-3 px-4 w-1/5 mr-2 border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
            type="number"
            value={serviceLine.price}
            onChange={(event) => handleServicePriceChange(index, event)}
            onBlur={(event) => handleServicePriceChange(index, event)}
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
