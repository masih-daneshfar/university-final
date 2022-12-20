
import Editor from "@components/editor";
import WithSidebarLayout from "@layouts/withSidebar";
import styles from "./artistPostPage.module.css";

export default function ArtistPostPage() {
  return (
    <WithSidebarLayout>
      <h2 className={styles.mainTitle}>استاد</h2>
      <hr />

      <Editor readOnly />
    </WithSidebarLayout>
  );
}
