import Table from "@components/table";
import clsx from "clsx";
import { useGlobalContext } from "context";
import styles from "./authProfilePage.module.css";

const AuthProfilePage = () => {
  const { currentUser } = useGlobalContext();

  return (
      <div className={styles.profileContainer}>
          <h2>اطلاعات کاربر</h2>
      <div className={clsx("grid", styles.profileInfoContainer)}>
        <div className={styles.profileInfo}>
          <strong>نام: </strong>
          {currentUser.firstName}
        </div>
        <div className={styles.profileInfo}>
          <strong>نام خانوادگی: </strong>
          {currentUser.lastName}
        </div>
      </div>
      <div className={clsx("grid", styles.profileInfoContainer)}>
        <div className={styles.profileInfo}>
          <strong>نام کاربری: </strong>
          {currentUser.username}
        </div>
      </div>
      {currentUser.role === "USER" && (
        <div className={styles.profileClasses}>
          {/* <Table
            headTitles={["نام کلاس", "روز", "استاد", "وضعیت پرداخت"]}
            rows={[
              ["ساز", "خودم", "سه شنبه", "موفق"],
              ["ساز", "خودم", "سه شنبه", "موفق"],
              ["ساز", "خودم", "سه شنبه", "موفق"],
              ["ساز", "خودم", "سه شنبه", "موفق"],
              ["ساز", "خودم", "سه شنبه", "موفق"],
              ["ساز", "خودم", "سه شنبه", "موفق"],
              ["ساز", "خودم", "سه شنبه", "موفق"],
              ["ساز", "خودم", "سه شنبه", "موفق"],
              ["ساز", "خودم", "سه شنبه", "موفق"],
              ["ساز", "خودم", "سه شنبه", "موفق"],
            ]}
          /> */}
        </div>
      )}
    </div>
  );
};

export default AuthProfilePage;
