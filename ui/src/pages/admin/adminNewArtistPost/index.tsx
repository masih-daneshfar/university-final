import { newTeacherPostApiCall, uploadFiles } from "@api/apis";
import Editor from "@components/editor";
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "./adminNewArtistPost.module.css";

type teacherEntity = Awaited<ReturnType<typeof newTeacherPostApiCall>>;

export default function AdminNewArtistPostPage() {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState<
    Omit<teacherEntity, "id" | "created_at" | "body">
  >({
    avatar: { name: "", extension: "", id: 0 },
    fullName: "",
    description: "",
  });
  const [body, setBody] = useState<string>();
  const onInputChange = ({
    key,
    data,
  }: {
    key: keyof teacherEntity;
    data: any;
  }) => {
    setTeacher((prev) => ({
      ...prev,
      [key]: data,
    }));
  };

  const onImageChange = useCallback(
    (type: "avatar"): ChangeEventHandler<HTMLInputElement> =>
      async (event) => {
        const files = event.target.files;
        const formData = new FormData();
        if (!files) return;
        else if (type === "avatar" && files.length === 1)
          formData.append("image", files[0]);
        const uploadedFile = await uploadFiles(formData);
        if (!Array.isArray(uploadedFile))
          setTeacher((prev) => ({
            ...prev,
            avatar: {
              id: uploadedFile.file.id,
              extension: uploadedFile.file.extension,
              name: uploadedFile.file.name,
            },
          }));
      },
    []
  );

  const onPostSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      if (body) {
        const { id } = await newTeacherPostApiCall({ body, ...teacher });
        toast.success("استاد با موفقیت ایجاد شد");
        navigate(`/panel/artist/${id}`);
      } else toast.error("ایجاد استاد با اشکال مواجه شد!");
    },
    [body, teacher, navigate]
  );

  return (
    <form className='container' onSubmit={onPostSubmit}>
      <h2 className={styles.mainTitle}>ایجاد استاد</h2>
      <hr />
      <label htmlFor='title'>
        نام استاد
        <input
          type='text'
          id='title'
          name='title'
          placeholder='نام استاد'
          defaultValue={teacher?.fullName}
          onChange={(event) => {
            onInputChange({ key: "fullName", data: event.target.value });
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
          defaultValue={teacher?.description}
          onChange={(event) => {
            onInputChange({ key: "description", data: event.target.value });
          }}
          rows={5}
        />
      </label>
      <label htmlFor='images'>
        آواتار
        <input
          id='description'
          placeholder='آواتار ...'
          type='file'
          required
          onChange={onImageChange("avatar")}
        />
      </label>
      <hr />
      <Editor
        defaultValue={JSON.parse('{"blocks":[]}')}
        onChange={async (api) => {
          const data = await api.saver.save();
          setBody(JSON.stringify(data));
        }}
      />
      <button type='submit' className=''>
        ثبت
      </button>
    </form>
  );
}
