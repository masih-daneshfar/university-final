import WithSidebarLayout from "@layouts/withSidebar";
import styles from "./galleryPostPage.module.css";

export default function GalleryPostPage() {
  return (
    <WithSidebarLayout>
      <h2 className={styles.mainTitle}>گالری2</h2>
      <hr />
    </WithSidebarLayout>
  );
}
