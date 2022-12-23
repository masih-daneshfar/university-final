import { Days, newClassItemApiCall, getAllTeachersApiCall } from "@api/apis";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "./adminNewClass.module.css";

type classEntity = Awaited<ReturnType<typeof newClassItemApiCall>>;

export default function AdminNewClassPage() {
  const navigate = useNavigate();
  const [classItem, setClassItem] = useState<
    Omit<classEntity, "id" | "created_at">
  >({
    title: "",
    days: [],
    description: "",
    teachers: [],
  });
  const [teachers, setTeachers] = useState<
    Awaited<ReturnType<typeof getAllTeachersApiCall>>
  >([]);

  useEffect(() => {
    (async () => {
      const teachers = await getAllTeachersApiCall();
      setTeachers(teachers);
    })();
  }, []);

  const onInputChange = ({
    key,
    data,
    checked,
  }: {
    key: keyof classEntity;
    data: any;
    checked?: boolean;
  }) => {
    if (checked === undefined)
      setClassItem((prev) => ({
        ...prev,
        [key]: data,
      }));
    else {
      setClassItem((prev) => {
        const setArray = new Set([...prev[key as "days"|"teachers"], data]);
        if (!checked) setArray.delete(data);
        console.log({ [key]: Array.from(setArray), checked });
        return { ...prev, [key]: Array.from(setArray) };
      });
    }
  };

  const onPostSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      if (classItem) {
        const { id } = await newClassItemApiCall({ ...classItem });
        toast.success("کلاس با موفقیت ایجاد شد");
        navigate(`/panel/classes/${id}`);
      } else toast.error("ایجاد کلاس با اشکال مواجه شد!");
    },
    [navigate, classItem]
  );
  return (
    <form className='container' onSubmit={onPostSubmit}>
      <h2 className={styles.mainTitle}>ایجاد کلاس</h2>
      <hr />
      <label htmlFor='title'>
        عنوان کلاس
        <input
          type='text'
          id='title'
          name='title'
          placeholder='عنوان کلاس'
          value={classItem?.title}
          onChange={(event) => {
            onInputChange({ key: "title", data: event.target.value });
          }}
          required
        />
      </label>
      <label htmlFor='description'>
        توضیحات
        <textarea
          id='description'
          placeholder='توضیحات ...'
          required
          value={classItem?.description}
          onChange={(event) => {
            onInputChange({ key: "description", data: event.target.value });
          }}
          rows={5}
        />
      </label>
      <label>روزهای برگزاری</label>
      <hr />
      <fieldset>
        {Object.entries(Days).map((day) => {
          return (
            <label key={day.join("--")} htmlFor={day.join("--")}>
              <input
                type='checkbox'
                id={day.join("--")}
                name='days'
                value={day[1]}
                onChange={(event) => {
                  onInputChange({
                    key: "days",
                    data: event.target.value,
                    checked: event.target.checked,
                  });
                }}
              />
              {day[1]}
            </label>
          );
        })}
      </fieldset>

      <label>انتخاب استاد</label>
      <hr />
      <fieldset>
        {Object.values(teachers).map((teacher) => {
          return (
            <label key={teacher.fullName} htmlFor={teacher.fullName}>
              <input
                type='checkbox'
                id={teacher.fullName}
                name='teachers'
                value={JSON.stringify({ id: teacher.id })}
                onChange={(event) => {
                  onInputChange({
                    key: "teachers",
                    data: JSON.parse(event.target.value),
                    checked: event.target.checked,
                  });
                }}
              />
              {teacher.fullName}
            </label>
          );
        })}
      </fieldset>

      <button type='submit' className=''>
        ثبت
      </button>
    </form>
  );
}
