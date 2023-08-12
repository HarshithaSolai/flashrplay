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

  let name;
  if (user) {
    if (user.displayName != null) {
      name = user.displayName;
    } else {
      name = user.email.substring(0, user.email.indexOf('@'));
    }
  }

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3 hover:cursor-pointer text-green-700"
        onClick={toggleOpen}>
        <Avatar />
        <div className="flex flex-col">
          <span className="text-md text-blue font-bold ">{name.toUpperCase()}</span>
          <span className="text-sm text-purple">{user.email}</span>
        </div>
      </div>

      {isOpen && (
        <div className="absolute shadow-md w-[40vw] md:w-full bg-white overflow-hidden right-0 top-14 text-sm p-6 ">
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
