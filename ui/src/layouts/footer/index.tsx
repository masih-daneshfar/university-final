import Anchor from "@components/anchor";
import clsx from "clsx";
import styles from "./footerLayout.module.css";

const FooterLayout = () => {
  return (
    <footer className={clsx(styles.container, "container-fluid")}>
      <small>
        <Anchor to='/' muted>
          خانه
        </Anchor>
        <Anchor to='/blog' muted>
          بلاگ
        </Anchor>
        <Anchor to='/about-us' muted>
          درباره ما
        </Anchor>
        <Anchor to='/tests' muted>
          آزمون آنلاین
        </Anchor>
      </small>
      <p className={styles.copyright}>
        © 2022 تمام حقوق مربوط به این وب سایت برای آموزشگاه موسیقی محفوظ است
      </p>
    </footer>
  );
};

export default FooterLayout;
