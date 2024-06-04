"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pageError, setPageError] = useState(null);

  const handleFormSubmit = async () => {
    console.log("Function was called");
    if (!user.email) return setPageError("Please enter your email address.");
    if (!user.username) return setPageError("Please fill the username field.");
    if (!user.password) return setPageError("Please fill the password field.");
    const response = await axios.post(`/api/register`, user);
    console.log(response);
    const { error, success } = response.data;
    if (error) return setPageError(error);
    if (success) setPageError(null);
    router.push("/");
  };

  useEffect(() => {
    console.log(pageError);
  }, [pageError]);

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
              <label htmlFor="">Username</label>
            </div>
            <div className="input-field">
              <input
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                type="text"
              />
            </div>
          </div>
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
              className="text-center py-4 rounded-lg w-full bg-purple text-white my-4 md:mt-8 md:mb-4"
            >
              Sign Up
            </button>
          </div>
          <div>
            Alreay have an account? <a href="/login">Login</a> here
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
