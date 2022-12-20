import { getAllTeachersApiCall } from "@api/apis";
import AdminArtistPost from "@components/admin/adminArtistPost";
import Anchor from "@components/anchor";
import { useEffect, useState } from "react";
import styles from "./AdminArtistListPage.module.css";

export default function AdminArtistListPage() {
  const [teachers, setTeachers] = useState<
    Awaited<ReturnType<typeof getAllTeachersApiCall>>
  >([]);
  useEffect(() => {
    (async () => {
      const teachers = await getAllTeachersApiCall();
      setTeachers(teachers);
    })();
  }, []);
  return (
    <div className='container'>
      <h2 className={styles.mainTitle}>لیست اساتید</h2>
      <Anchor to='/panel/artist/new'>ایجاد استاد جدید</Anchor>
      <hr />
      {teachers.map((teacher) => (
        <AdminArtistPost
          fullName={teacher.fullName}
          id={teacher.id}
          key={`gallery-${teacher.id}`}
          summery={teacher.description}
          avatarUrl={teacher.avatar?.name}
          href={`/panel/artist/${teacher.id}`}
        />
      ))}
    </div>
  );
}
