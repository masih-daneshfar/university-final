import Anchor from "@components/anchor";
import styles from "./adminPostItem.module.css";

interface AdminPostItemType {
  title?: string;
  summery?: string;
  id?: string;
}
function AdminPostItem({ id, summery, title }: AdminPostItemType) {
  return (
    <>
      <div className={styles.postContainer}>
        <h3 className={styles.postTitle}>{title}</h3>
        <p className={styles.postSummery}>{summery}</p>
        <Anchor role="button" to={`/panel/blog/${id}`} contrast fullWidth>ویرایش</Anchor>
      </div>
    </>
  );
}

export default AdminPostItem;
