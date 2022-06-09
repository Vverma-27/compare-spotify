import React, { useEffect } from "react";
import Authentication from "./components/Authentication";
import { useAppDispatch } from "./redux/hooks";
import {
  setUser1Token,
  setUser1Username,
  setUser2Token,
  setUser2Username,
} from "./redux/User/userSlice";
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const user1Token = window.localStorage.getItem("user1");
    const user2Token = window.localStorage.getItem("user2");
    console.log("here ");
    if (user1Token) {
      dispatch(setUser1Token(user1Token));
      dispatch(setUser1Username(user1Token));
    }
    if (user2Token) {
      dispatch(setUser2Token(user2Token));
      dispatch(setUser2Username(user2Token));
    }
  }, []);
  return <Authentication />;
}

export default App;
