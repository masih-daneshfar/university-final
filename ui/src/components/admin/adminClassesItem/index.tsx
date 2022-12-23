import Anchor from "@components/anchor";
import styles from "./adminClassesItem.module.css";

interface AdminClassesItemType {
  title: string;
  href: string;
  id: number;
  days: string[];
  teachers?: string[];
}
function AdminClassesItem({
  href = "",
  title,
  days,
  teachers=[],
}: AdminClassesItemType) {
  return (
    <>
      <div className={styles.classItemContainer}>
        <div className={styles.classItemInfoContainer}>
          <h3 className={styles.classItemTitle}>{title}</h3>
          <div className={styles.classItemTitle}>
            <strong>روز برگزاری: </strong>
            {days.join(" ,")}
          </div>
          <div className={styles.classItemTitle}>
            <strong>اساتید: </strong>
            {teachers.join(" ,")}
          </div>
          <Anchor role='button' to={href} contrast fullWidth>
            ویرایش
          </Anchor>
        </div>
      </div>
    </>
  );
}

export default AdminClassesItem;
