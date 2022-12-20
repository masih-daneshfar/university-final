import Anchor from "@components/anchor";
import styles from "./postItem.module.css";

interface PostItemType {
  title?: string;
  summery?: string;
  href?: string;
}
function PostItem({ href="", summery, title }: PostItemType) {
  return (
    <>
      <div className={styles.postContainer}>
        <h3 className={styles.postTitle}>{title}</h3>
        <p className={styles.postSummery}>{summery}</p>
        <Anchor to={href}>بیشتر ...</Anchor>
      </div>
    </>
  );
}

export default PostItem;
