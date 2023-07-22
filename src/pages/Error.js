import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <section className="mx-auto mt-48 w-80 text-center">
        <p>The app has stopped working because you've mostly been logged out!</p>
        <p>Please contact system admin if issue persists!</p>
        <Link to="/login" className="text-red-500 underline">
          Login
        </Link>
      </section>
    </>
  );
}
