import { useUserContext } from "@/utils/UserContext";
import UserHeader from "./UserHeader";
import HomePageHeader from "./HomePageHeader";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const user = useUserContext();
  
  return <>{user ? <UserHeader /> : <HomePageHeader/>}</>;
};

export default Header;
