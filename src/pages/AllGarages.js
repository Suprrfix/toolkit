import React from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import Card from "../components/UI/Card";

export default function AllGaragesPage() {
  const navigate = useNavigate();
  const allGarages = useLoaderData();

  const onGarageClick = (garageId) => {
    localStorage.setItem('garage_id', garageId);
    navigate(`/garage/${garageId}`);
  }

  const role = localStorage.getItem("role");

  if (role !== "SUPER_ADMIN") {
    return <div>All garages here. Only SuperAdmin can see this.</div>;
  }
  return (
    <>
      <Link to="/garage/add" className="flex-1 btn w-full btn-blue">Add new garage</Link>
      <h1 className="mt-2 mb-4 text-center text-xl">All Suprrfix Garages</h1>
      {allGarages.map((garage, index) => {
        return (
          <Card className="p-4 md:p-7" key={`garage_ ${index}`}>
            <h2 className="text-xl">{garage.garage_name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{garage.garage_address} - {garage.garage_pin_code}</p> 
            <button onClick={() => onGarageClick(garage.garage_id)} className="text-blue-900 dark:text-blue-300 text-right mt-2">Login as owner <i className="fas fa-chevron-right"></i></button>
            </Card>
        );
      })}
      
    </>
  );
}
