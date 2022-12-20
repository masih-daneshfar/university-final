import { logoutApiCall } from "@api/apis";
import Anchor from "@components/anchor";
import clsx from "clsx";
import { useGlobalContext } from "context";
import { useNavigate } from "react-router-dom";
import styles from "./navbarLayout.module.css";

export default function NavbarLayout() {
  const {
    currentUser: { loggedIn, role },
  } = useGlobalContext();
  return (
    <div className='container-fluid'>
      <nav className={clsx(styles.container, "container-fluid")}>
        <ul>
          <li>
            <Anchor to='/' className={clsx(styles.logoAnchor, "contrast")}>
              <strong>آموزشگاه موسیقی</strong>
            </Anchor>
          </li>
        </ul>
        <NavbarMenuLinks loggedIn={loggedIn} role={role} />
      </nav>
    </div>
  );
}
interface NavbarMenuLinksType {
  loggedIn: boolean;
  role?: "ADMIN" | "USER";
}
const NavbarMenuLinks = ({ loggedIn, role }: NavbarMenuLinksType) => {
  const navigate = useNavigate();

  const { updateUserInfo } = useGlobalContext();

  const onLogout = () => {
    logoutApiCall(async () => {
      await updateUserInfo();
      navigate("/");
    });
  };
  return (
    <div className={styles.menuBar}>
      <ul>
        <li>
          <Anchor to='/' className={clsx(styles.menuBarItem, "contrast")}>
            <strong>خانه</strong>
          </Anchor>
        </li>
        <li>
          <Anchor
            to='/classes'
            className={clsx(styles.menuBarItem, "contrast")}
          >
            <strong>کلاسها</strong>
          </Anchor>
        </li>
        <li>
          <Anchor
            to='/artists'
            className={clsx(styles.menuBarItem, "contrast")}
          >
            <strong>اساتید</strong>
          </Anchor>
        </li>
        <li>
          <Anchor to='/blog' className={clsx(styles.menuBarItem, "contrast")}>
            <strong>بلاگ</strong>
          </Anchor>
        </li>
        <li>
          <Anchor to='/faq' className={clsx(styles.menuBarItem, "contrast")}>
            <strong>پرسشهای پرتکرار</strong>
          </Anchor>
        </li>
        <li>
          <Anchor
            to='/gallery'
            className={clsx(styles.menuBarItem, "contrast")}
          >
            <strong>گالری</strong>
          </Anchor>
        </li>
        {loggedIn ? (
          <>
            <li>
              <Anchor
                to='/panel'
                className={clsx(styles.menuBarItem, "contrast")}
              >
                <strong>پنل شخصی</strong>
              </Anchor>
            </li>
            <li>
              <Anchor
                to='#'
                onClick={onLogout}
                className={clsx(styles.menuBarItem, "contrast")}
              >
                <strong>خروج</strong>
              </Anchor>
            </li>
          </>
        ) : (
          <li>
            <Anchor
              to='/auth/login'
              className={clsx(styles.menuBarItem, "contrast")}
            >
              <strong>ورود/ثبت‌نام</strong>
            </Anchor>
          </li>
        )}
      </ul>
      {role === "ADMIN" && <NavbarAdminMenuLinks />}
    </div>
  );
};
const NavbarAdminMenuLinks = () => {
  return (
    <ul>
      <li>
        <Anchor
          to='/panel/blog'
          className={clsx(styles.menuBarItem, "contrast")}
        >
          <strong>مدیریت بلاگ</strong>
        </Anchor>
      </li>
      <li>
        <Anchor
          to='/panel/faq'
          className={clsx(styles.menuBarItem, "contrast")}
        >
          <strong>مدیریت پرسشهای پرتکرار</strong>
        </Anchor>
      </li>
    </ul>
  );
};
