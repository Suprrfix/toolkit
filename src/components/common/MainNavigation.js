import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

export default function MainNavigation() {
  return (
    <div className="fixed bottom-0 left-4 right-4 px-7 bg-white shadow-lg rounded-2xl mb-4 dark:bg-slate-600">
      <div className="flex">
        <div className={classes.navigation + " group"}>
          <NavLink
            to="/garage"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <span className="block px-1 pt-1 pb-2">
              <i className="far fa-garage-car text-2xl pt-1 mb-1 block"></i>
              <span className="block text-xs pb-1">Garage</span>
            </span>
          </NavLink>
        </div>
        <div className={classes.navigation + " group"}>
          <NavLink
            to="/business"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <span className="block px-1 pt-1 pb-2">
              <i className="far fa-rupee-sign text-2xl pt-1 mb-1 block"></i>
              <span className="block text-xs pb-1">Business</span>
            </span>
          </NavLink>
        </div>
        <div className={classes.navigation + " group"}>
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <span className="block px-1 pt-1 pb-2">
              <i className="far fa-users text-2xl pt-1 mb-1 block"></i>
              <span className="block text-xs pb-1">Customers</span>
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
