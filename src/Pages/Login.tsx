import { ChangeEvent, useState } from "react";
import { setAsyncUserData } from "../Featuers/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Featuers/hooks/hooks";
const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const submitHandler = (event: ChangeEvent<HTMLFormElement>) => {
    const user = {
      loading: false,
      data: userData,
      error: null,
    };
    if (userData.email.length && userData.password.length > 8) {
      // @ts-ignore
      dispatch(setAsyncUserData(user)).then((res) => {
        if (res.payload) {
          setUserData({ email: "", password: "" });
          navigate("/");
        }
      });
    }
    event.preventDefault();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col mt-40 shadow-xl bg-slate-600 w-[500px] h-auto p-7 rounded-xl mx-auto items-center ">
        <input
          className=" bg-gray-100 rounded-lg py-2 px-4 focus:outline-none focus:ring-4 focus:ring-gray-200 focus:p-1 my-4 w-full"
          type="text"
          value={userData.email}
          onChange={(event) =>
            setUserData((prevState) => ({
              ...prevState,
              email: event.target.value,
            }))
          }
          placeholder="Enter your email"
        />
        <input
          className=" bg-gray-100 rounded-lg py-2 px-4 focus:outline-none focus:ring-4 focus:ring-gray-200 focus:p-1 my-4 w-full"
          type="password"
          value={userData.password}
          onChange={(event) =>
            setUserData((prevState) => ({
              ...prevState,
              password: event.target.value,
            }))
          }
          placeholder="Enter your password"
        />
        <button
          disabled={loading}
          className={`${
            loading && "cursor-not-allowed"
          } text-slate-700 w-full mt-6 p-3 bg-slate-200 rounded-lg`}
          type="submit"
        >
          {loading ? "Loading ...." : "Login"}
        </button>
        {error && (
          <div className="px-3 py-2 mt-5 w-full text-center rounded text-red-200 bg-red-600">
            {error}
          </div>
        )}
      </div>
    </form>
  );
};

export default Login;
