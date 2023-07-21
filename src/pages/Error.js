import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <section className="mx-auto mt-48 w-80 text-center">
        <p>You've been logged out!</p>
        <Link to="/login" className="text-red-500 underline">
          Login
        </Link>
      </section>
    </>
  );
}
