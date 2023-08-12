import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../utils/context/AuthContext";
import Avatar from "./Avatar";


const UserMenu = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

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
      <div className="flex flex-row items-center gap-3 hover:cursor-pointer text-green-700"
        onClick={toggleOpen}>
        <Avatar />
        <div>{user.displayName || user.email}</div>
      </div>

      {isOpen && (
        <div className="absolute shadow-md w-[40vw] md:w-full bg-green-100 overflow-hidden right-0 top-14 text-sm p-6 ">
          <div className="flex flex-col cursor-pointer gap-3 ">
            <div onClick={() => {}}> Settings</div>
            <div onClick={handleSignOut}>Log out</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
