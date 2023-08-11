import Avatar from "../Avatar";
import { UserAuth } from "../../utils/context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <Avatar />
        <div
          onClick={handleSignOut}
          className=" text-white rounded-md outline-none p-1 bg-red-500 text-base">
          Logout
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
