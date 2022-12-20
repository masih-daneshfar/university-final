import ArtistItem from "@components/artistItem";
import WithSidebarLayout from "@layouts/withSidebar";
import styles from "./artistListPage.module.css";

export default function ArtistListPage() {
  return (
    <WithSidebarLayout>
      <h2 className={styles.mainTitle}>لیست اساتید</h2>
      <hr />
      {[1, 2, 3, 4, 5, 4, 4, 33, 3, 3, 3, 3].map(() => (
        <>
          <ArtistItem title='استاد' avatarUrl='https://i.pravatar.cc/300' href="/artists/1" summery="asjdahs dhash djahsd akjsdhash dkasjdhaksdhakjsd" />
        </>
      ))}
    </WithSidebarLayout>
  );
}
