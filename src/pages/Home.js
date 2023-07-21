import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <p>Main page</p>
      <Link to="/garage">Go to garage</Link>
    </>
  );
}
