import { getAllClassesApiCall } from "@api/apis";
import AdminClassesItem from "@components/admin/adminClassesItem";
import Anchor from "@components/anchor";
import { useEffect, useState } from "react";
import styles from "./adminClassesListPage.module.css";

export default function AdminClassesList() {
  const [classItems, setclassItems] = useState<
    Awaited<ReturnType<typeof getAllClassesApiCall>>
  >([]);
  useEffect(() => {
    (async () => {
      const classItems = await getAllClassesApiCall();
      setclassItems(classItems);
    })();
  }, []);
  return (
    <div className='container'>
      <h2 className={styles.mainTitle}>لیست کلاسها</h2>
      <Anchor to='/panel/classes/new'>ایجاد کلاس جدید</Anchor>
      <hr />
      {classItems.map((classItem) => (
        <AdminClassesItem
          title={classItem.title}
          id={classItem.id}
          key={`classes-${classItem.id}`}
          href={`/panel/classes/${classItem.id}`}
          days={classItem.days}
          teachers={classItem.teachers.map(teacher=>teacher.fullName)}
        />
      ))}
    </div>
  );
}
