import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";

export default function LogoutPage() {
  const { logout } = useAuth();

    logout();
    
    return (
        <div>
          <p>Successfully logged out. </p>
          <Link to="/login">Login here.</Link>
        </div>
      );
}
