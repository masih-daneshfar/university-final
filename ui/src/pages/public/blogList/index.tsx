import PostItem from "@components/postItem";
import WithSidebarLayout from "@layouts/withSidebar";
import styles from "./blogListPage.module.css";

export default function BlogListPage() {
  return (
    <WithSidebarLayout>
      <h2 className={styles.mainTitle}>بلاگ آموزشگاه</h2>
      <hr />
      {[1, 2, 3, 4,5,4,4,33,3,3,3,3].map(() => (
        <>
          <PostItem title='یک تیتیر' href="/blog/1" />
        </>
      ))}
    </WithSidebarLayout>
  );
}
