import { getSingleTeacherApiCall } from "@api/apis";
import Editor from "@components/editor";
import WithSidebarLayout from "@layouts/withSidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./artistPostPage.module.css";

type teacherEntity = Awaited<ReturnType<typeof getSingleTeacherApiCall>>;
export default function ArtistPostPage() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState<Omit<teacherEntity, "id">>({
    body: "",
    created_at: "",
    description: "",
    fullName: "",
    avatar: { name: "", extension: "", id: 0 },
  });
  useEffect(() => {
    (async () => {
      const teacher = await getSingleTeacherApiCall(Number(id));
      setTeacher(teacher);
    })();
  }, [id]);
  return (
    <WithSidebarLayout>
      <h2 className={styles.mainTitle}>{teacher.fullName}</h2>
        <p className={styles.artistDescription}>
        <img
          className={styles.artistAvatar}
          src={`http://localhost:3001/uploads/${teacher.avatar?.name}`}
          alt=''
        />
          {teacher.description}
        </p>
      <hr />

      {teacher.body && (
        <Editor
          readOnly
          defaultValue={JSON.parse(teacher.body || `{"blocks":[]}`)}
        />
      )}
    </WithSidebarLayout>
  );
}
