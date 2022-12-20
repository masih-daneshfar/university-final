
import Table from "@components/table";
import WithSidebarLayout from "@layouts/withSidebar";
import styles from "./classesPage.module.css";

export default function ClassesPage() {
  return (
    <WithSidebarLayout>
      <h2 className={styles.mainTitle}>لیست کلاسها</h2>
      <hr />
      <Table headTitles={["نام کلاس", "روز کلاس", "نام استاد"]} rows={[
        ["asd","123","333"],
        ["asd","123","333"],
        ["asd","123","333"],
        ["asd","123","333"],
        ["asd","123","333"],
      ]} />
    </WithSidebarLayout>
  );
}
