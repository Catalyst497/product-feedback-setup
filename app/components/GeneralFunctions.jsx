import axios from 'axios'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useUpdateFeedbacks from "../hooks/useUpdateFeedbacks";
import { jwtDecode } from "jwt-decode";
import { setUserState } from "@/GlobalRedux/slices/UserSlice";

export default function GeneralFunctions({ children }) {

      const { user } = useSelector((st) => st.user);
      const dispatch = useDispatch();
      const getFeedbacks = useUpdateFeedbacks();
    
      useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          if (decoded) {
            dispatch(setUserState(decoded));
          }
        }
      }, []);
      useEffect(() => {
        if (Object.keys(user)) {
          getFeedbacks();
        }
      }, [user, dispatch]);
      return (
        <>{children}</>
      );
    }