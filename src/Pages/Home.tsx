import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../Featuers/hooks/hooks";

const HomePage = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);
  const getUserData = () => {
    let user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  };
  const [localUser, setLocalUser] = useState(getUserData());

  const handleLougout = () => {
    localStorage.removeItem("user");
    setLocalUser(null);
  };
  console.log(user);

  return (
    <div className=" flex flex-col items-center mt-40 justify-center">
      {localUser ? (
        <>
          <div>
            <div className="mt-10 text-2xl">
              Hello Mr{" "}
              <span className="bg-green-200 p-2 rounded-sm">
                {localUser.email}
              </span>
            </div>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-gray-500 rounded text-white"
            onClick={handleLougout}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <div className="bg-blue-500 text-white rounded my-auto p-4">
            <h2 className="text-2xl font-bold">
              Welcome to Authentication With Redux-toolkit !
            </h2>
          </div>
          <NavLink
            className="px-5 py-2 mt-5 bg-blue-500 text-white rounded-md"
            to="Login"
          >
            Login
          </NavLink>
        </>
      )}
    </div>
  );
};

export default HomePage;
