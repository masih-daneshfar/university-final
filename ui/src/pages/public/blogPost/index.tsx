import SinglePostLayout from "@layouts/singlePost";
import WithSidebarLayout from "@layouts/withSidebar";
import styles from "./blogPostPage.module.css";

export default function BlogPostPage() {
  return (
    <WithSidebarLayout>
      <h2 className={styles.mainTitle}>بلاگ آموزشگاه</h2>
      <hr />

      <SinglePostLayout />
    </WithSidebarLayout>
  );
}
