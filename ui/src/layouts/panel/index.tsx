import clsx from "clsx";
import { Outlet, useNavigate } from "react-router-dom";
import FooterLayout from "@layouts/footer";
import CenterLayout from "@layouts/center";
import styles from "./panelLayout.module.css";
import NavbarLayout from "@layouts/navbar";
import { useGlobalContext } from "context";
import { useEffect } from "react";

const PanelLayout = () => {
  const {
    currentUser: { loggedIn },
  } = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn) navigate("/auth/login");
  }, [loggedIn, navigate]);

  return (
    <CenterLayout>
      <div className={clsx(styles.container)}>
        <NavbarLayout />
        <Outlet />
        <FooterLayout />
      </div>
    </CenterLayout>
  );
};

export default PanelLayout;
