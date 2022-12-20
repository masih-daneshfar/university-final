import GalleryItem from "@components/galleryItem";
import WithSidebarLayout from "@layouts/withSidebar";
import styles from "./galleryPage.module.css";

export default function GalleryPage() {
  return (
    <WithSidebarLayout>
      <h2 className={styles.mainTitle}>گالری تصاویر</h2>
      <hr />

      {[1, 2, 3, 4, 5, 4, 4, 33, 3, 3, 3, 3].map(() => (
        <>
          <GalleryItem
            title='استاد'
            avatarUrl='https://i.pravatar.cc/300'
            href='/gallery/1'
            summery='asjdahs dhash djahsd akjsdhash dkasjdhaksdhakjsd'
          />
        </>
      ))}
    </WithSidebarLayout>
  );
}
