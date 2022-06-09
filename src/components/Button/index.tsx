import React from "react";
import styles from "./index.module.scss";

const Button = ({
  className,
  children,
  onClick,
}: {
  className: string;
  children: JSX.Element;
  onClick?: () => void;
}) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
