import React, { useEffect, useState } from "react";
import { UserAuth } from "../../utils/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/flashlogo.png";

const SignIn = () => {
  //Sign in with email & password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signIn, user } = UserAuth();

  const navigate = useNavigate();

  //Email & Password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/");
    } catch (e) {
      setError("Invalid e-mail or password");
      console.log(e.message);
    }
  };

  useEffect(() => {
    console.log("user in signin", user);
    if (user != null) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <div>
      <section className="h-screen">
        <div className="px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <div className="flex justify-center mb-6">
                <img src={logo} className="w-[40%]" alt="logo" />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <input
                    type="email"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-800 bg-white bg-clip-padding border border-solid border-gray rounded transition ease-in-out m-0 focus:text-gray-dark focus:bg-white focus:border-yellow focus:outline-none"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray rounded transition ease-in-out m-0 focus:text-gray-dark focus:bg-white focus:border-yellow focus:outline-none"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <span className="text-red-500">{error && error} </span>
                </div>

                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-purple-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-700 active:shadow-lg transition duration-150 ease-in-out w-full"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Sign in
                </button>

                
                <div className="text-center">
                  <p className="text-md font-semibold mt-2 pt-1 mb-0 text-blue-dark">
                    Don't have an account yet ?
                    <Link
                      to="/signup"
                      className="text-red ml-2 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out underline"
                    >
                      Sign up.
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
