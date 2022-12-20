import { getAllTeachersApiCall } from "@api/apis";
import ArtistItem from "@components/artistItem";
import WithSidebarLayout from "@layouts/withSidebar";
import { useEffect, useState } from "react";
import styles from "./artistListPage.module.css";

type teachersEntity = Awaited<ReturnType<typeof getAllTeachersApiCall>>;
export default function ArtistListPage() {
  const [teachers, setTeachers] = useState<teachersEntity>([]);
  useEffect(() => {
    (async () => {
      const teachers = await getAllTeachersApiCall();
      setTeachers(teachers);
    })();
  }, []);
  return (
    <WithSidebarLayout>
      <h2 className={styles.mainTitle}>لیست اساتید</h2>
      <hr />
      {teachers.map((teacher) => (
        <ArtistItem
          key={`gallery-${teacher.id}`}
          title={teacher.fullName}
          avatarUrl={teacher.avatar.name}
          href={`/artists/${teacher.id}`}
          summery={teacher.description}
        />
      ))}
    </WithSidebarLayout>
  );
}
