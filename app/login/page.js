"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import Loader from "../components/Loader";
import useAuthorize from "../hooks/useAuthorize";
import { useDispatch } from "react-redux";
import { setUserState } from "@/GlobalRedux/slices/UserSlice";
import { TailSpin } from "react-loader-spinner";

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [callLoading, setCallLoading] = useState(false);
  const authFunc = useAuthorize();

  useEffect(() => {
    async function checkAuth() {
      try {
        const authStatus = await authFunc();
        if (authStatus === true) {
          router.push("/");
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    checkAuth();
  }, [authFunc, router]);

  const [pageError, setPageError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = async () => {
    if (!user.email) return setPageError("Please enter your email address.");
    if (!user.password) return setPageError("Please fill the password field.");
    setCallLoading(true);
    const response = await axios.post(`/api/login`, user);
    console.log(response);
    const { error, success, token } = response.data;
    if (error) {
      setCallLoading(false);
      return setPageError(error);
    }
    setPageError(null);
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded) {
        dispatch(setUserState(decoded));
      }
    } else return console.log("token is falsy. Why??");

    localStorage.setItem("token", token);
    setCallLoading(false);
    router.push("/");
  };

  if (loading) return <Loader />;
  return (
    <div className="auth-page flex justify-center items-center py-[5rem]">
      <div className="form-container bg-white rounded-lg p-6 md:p-8 w-[85%] sm:w-[50%] md:w-[50%] max-w-[30rem]">
        {pageError && (
          <div className="page-err text-red-500 text-[1.5rem] md:text-[2rem] text-center mb-4">
            {pageError}
          </div>
        )}
        <div>
          <div>
            <div>
              <label htmlFor="">Email Address</label>
            </div>
            <div className="input-field">
              <input
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="text"
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="">Password</label>
            </div>
            <div className="input-field flex justify-between items-center">
              <input
                type={passwordVisible ? "text" : "password"}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <span className="password-visibility-icon">
                {!passwordVisible ? (
                  <FaEye size={28} onClick={() => setPasswordVisible(true)} />
                ) : (
                  <FaEyeSlash
                    size={28}
                    onClick={() => setPasswordVisible(false)}
                  />
                )}
              </span>
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={handleFormSubmit}
              className="relative text-center py-4 rounded-lg w-full bg-purple text-white my-4 md:mt-8 md:mb-4"
            >
              Login
              {callLoading && (
                <TailSpin color="white" height={30} className="" />
              )}
            </button>
          </div>
          <div>
            Don't have an account? <a href="/register">Sign up</a> here
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
