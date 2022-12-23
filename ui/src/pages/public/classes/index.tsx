import { getAllClassesApiCall } from "@api/apis";
import Anchor from "@components/anchor";
import Table from "@components/table";
import WithSidebarLayout from "@layouts/withSidebar";
import { ReactNode, useEffect, useState } from "react";
import styles from "./classesPage.module.css";

export default function ClassesPage() {
  const [classes, setClasses] = useState<(ReactNode|string)[][]>([]);
  useEffect(() => {
    (async () => {
      const classes = await getAllClassesApiCall();
      const formatedClasses = classes.map((classItem) => [
        classItem.title,
        classItem.days.join(" - "),
        classItem.teachers.map((teacher) => (
          <Anchor to={`/artists/${teacher.id}`}>{teacher.fullName}</Anchor>
        )),
      ]);
      setClasses(formatedClasses);
    })();
  }, []);
  return (
    <WithSidebarLayout>
      <h2 className={styles.mainTitle}>لیست کلاسها</h2>
      <hr />
      <Table
        headTitles={["کلاس", "روز برگزاری", "استاد"]}
        rows={classes}
      />
    </WithSidebarLayout>
  );
}
