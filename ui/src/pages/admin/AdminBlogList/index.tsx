import AdminPostItem from "@components/admin/adminPostItem";
import styles from "./adminBlogListPage.module.css";

export default function AdminBlogListPage() {
  return (
    <div className="container">
      <h2 className={styles.mainTitle}>لیست پست های بلاگ</h2>
      <hr />
      {[1, 2, 3, 4, 5, 4, 4, 33, 3, 3, 3, 3].map(() => (
        <>
          <AdminPostItem title='یک تیتیر' id='1' />
        </>
      ))}
    </div>
  );
}
