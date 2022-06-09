import React, { useEffect, useState } from "react";
import Button from "../Button";
import styles from "./index.module.scss";
import spotify from "../../assets/spotify_logo.png";
import { authEndpoint, clientId, redirectUri, scopes } from "../../config";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setUser1Token,
  setUser1Username,
  setUser2Token,
  setUser2Username,
} from "../../redux/User/userSlice";
import Comparison from "../Comparison";

const Authentication = () => {
  const dispatch = useAppDispatch();
  const [showComparison, setShowComparison] = useState(false);
  const { user1Token, user2Token, user1, user2 } = useAppSelector(
    (state) => state.user
  );
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const token = hash.split("#")[1].split("&")[0].split("=")[1];
    if (token) {
      const user = window.location.pathname === "/1/" ? 1 : 2;
      //   console.log("bye ");
      if (user === 1) {
        // dispatch(setUser1Token(token));
        // dispatch(setUser1Username(user1Token));
        window.localStorage.setItem("user1", token);
      } else {
        // dispatch(setUser2Token(token));
        // dispatch(setUser2Username(user2Token));
        window.localStorage.setItem("user2", token);
      }
    }
    window.location.hash = "";
  }, []);
  if (showComparison)
    return (
      <div className={styles.container}>
        <Comparison />
      </div>
    );
  return (
    <div className={styles.container}>
      <img src={spotify} alt="spotify logo" className={styles.logo} />
      <section style={{ display: "flex", gap: "2vmax" }}>
        <section
          style={{ display: "flex", gap: "2vmin", flexDirection: "column" }}
        >
          <p className={styles.text}>User: {user1.name || "No User"}</p>
          <Button
            className={""}
            onClick={() => {
              window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${
                redirectUri + "/1/"
              }&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`;
            }}
          >
            <p className={styles.text}>
              {!user1Token ? "Login" : "Change"} User 1
            </p>
          </Button>
        </section>
        <section
          style={{ display: "flex", gap: "2vmin", flexDirection: "column" }}
        >
          <p className={styles.text}>User: {user2.name || "No User"}</p>
          <Button
            className={styles.button2}
            onClick={() => {
              window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${
                redirectUri + "/2/"
              }&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`;
            }}
          >
            <p className={styles.text}>
              {!user2Token ? "Login" : "Change"} User 2
            </p>
          </Button>
        </section>
      </section>
      {user1Token && user2Token && (
        <Button
          className=""
          onClick={() => {
            setShowComparison(true);
          }}
        >
          <p className={styles.text}>Compare</p>
        </Button>
      )}
    </div>
  );
};

export default Authentication;
