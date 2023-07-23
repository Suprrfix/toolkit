import React from "react";
import MainNavigation from "../components/common/MainNavigation";
import { useLoaderData } from "react-router-dom";

export default function GarageBusinessPage() {
  const garageDetails = useLoaderData();
  // console.log(garageDetails);

  /*
  garage_id": 1,
    "garage_name": "Maxwell Motors",
    "garage_address": "Labne Road, Shawarma Nagar, Dilawar, Maharashtra",
    "garage_pincode": 560090,
    "garage_owner_name": "Maxell",
    "owner_phone_number": "9819004016",
    "total_no_customers": 2,
    "total_no_check_ins": 2,
    "total_no_check_outs": 1,
    "total_no_incomplete_check_ins": 1,
    "total_revenue_for_the_day": 37259.0
  */

  return (
    <>
    <div className="stat-card">
        <div> Today's cash: </div>
       <div className="stat-value"><i className="fas fa-rupee-sign"></i> {garageDetails.total_revenue_for_the_day}</div>
      </div>
      <div className="stat-card">
        <div>Total no. of customers:</div>
        <div className="stat-value"><i className="fas fa-users"></i> {garageDetails.total_no_customers}</div>
      </div>
      <div className="stat-card">
        <div>Total visits to garage:</div>
         <div className="stat-value">{garageDetails.total_no_check_ins}</div>
      </div>
      <div className="stat-card">
        <div>Total deliveries to customer:</div>
        <div className="stat-value">{garageDetails.total_no_check_outs}</div>
      </div>
      <div className="stat-card">
        <div>Vehicles in the garage: </div>
        <div className="stat-value">{garageDetails.total_no_incomplete_check_ins}</div>
      </div>
      
      <MainNavigation />
    </>
  );
}
