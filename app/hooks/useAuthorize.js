"use client";
import React from "react";
import axios from "axios";

function useAuthorize() {
  const token = localStorage.getItem("token"); // Retrieve token from local storage

  const authFunc = async () => {
    if (!token) {
      return false;
    } else {
      try {
        const response = await axios.get("/api/auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status != 200) {
          localStorage.removeItem("token");
          return false;
        }
        return true;
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        return false;
      }
    }
  };

  return authFunc  
}

export default useAuthorize;
