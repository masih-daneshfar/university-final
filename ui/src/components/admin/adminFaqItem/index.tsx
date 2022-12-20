import Anchor from "@components/anchor";
import styles from "./adminFaqItem.module.css";

interface AdminFaqItemType {
  title?: string;
  summery?: string;
  id?: number;
}
function AdminFaqItem({ id, summery, title }: AdminFaqItemType) {
  return (
    <>
      <div className={styles.postContainer}>
        <h3 className={styles.postTitle}>{title}</h3>
        <p className={styles.postSummery}>{summery}</p>
        <Anchor role="button" to={`/panel/faq/${id}`} contrast fullWidth>ویرایش</Anchor>
      </div>
    </>
  );
}

export default AdminFaqItem;
