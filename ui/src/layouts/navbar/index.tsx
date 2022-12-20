import Anchor from "@components/anchor";
import clsx from "clsx";
import styles from "./navbarLayout.module.css";

interface NavbarType {
  isAdmin?: boolean;
}
export default function NavbarLayout({ isAdmin }: NavbarType) {
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
        {isAdmin ? <NavbarAdminMenuLinks /> : <NavbarPublicMenuLinks />}
      </nav>
    </div>
  );
}

const NavbarPublicMenuLinks = () => {
  return (
    <>
      <ul className={styles.menuBar}>
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
        <li>
          <Anchor to='/auth' className={clsx(styles.menuBarItem, "contrast")}>
            <strong>ورود/ثبت‌نام</strong>
          </Anchor>
        </li>
      </ul>
    </>
  );
};
const NavbarAdminMenuLinks = () => {
  return (
    <>
      <ul className={styles.menuBar}>
        <li>
          <Anchor to='/' className={clsx(styles.menuBarItem, "contrast")}>
            <strong>بازگشت به سایت</strong>
          </Anchor>
        </li>
        <li>
          <Anchor
            to='/auth/logout'
            className={clsx(styles.menuBarItem, "contrast")}
          >
            <strong>خروج</strong>
          </Anchor>
        </li>
      </ul>
    </>
  );
};
