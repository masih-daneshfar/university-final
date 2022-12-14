import {
  removeTeacherSingleApiCall,
  getSingleTeacherApiCall,
  uploadFiles,
  updateTeacherPostApiCall,
} from "@api/apis";
import Editor from "@components/editor";
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./adminArtistPost.module.css";

type teacherEntity = Awaited<ReturnType<typeof updateTeacherPostApiCall>>;

export default function AdminArtistPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState<
    Partial<Omit<teacherEntity, "id" | "created_at">>
    >({});
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

  useLayoutEffect(() => {
    (async () => {
      const teacher = await getSingleTeacherApiCall(Number(id));
      setTeacher(teacher);
    })();
  }, [id]);

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
      if (teacher) {
        await updateTeacherPostApiCall({ id: Number(id),body, ...teacher });
        toast.success("?????????? ???? ???????????? ?????????? ????");
      } else toast.error("?????????? ?????????? ???? ?????????? ?????????? ????!");
    },
    [teacher, id, body]
  );

  const onTeacherRemove = useCallback(async () => {
    if (teacher) {
      await removeTeacherSingleApiCall(Number(id));
      toast.success("?????????? ???? ???????????? ?????? ????");
      navigate("/panel/gallery");
    } else toast.error("?????? ?????????? ???? ?????????? ?????????? ????!");
  }, [id, navigate, teacher]);

  return (
    <form className='container' onSubmit={onPostSubmit}>
      <h2 className={styles.mainTitle}>???????????? ??????????</h2>
      <hr />
      <label htmlFor='title'>
        ?????? ??????????
        <input
          type='text'
          id='title'
          name='title'
          placeholder='?????? ??????????'
          defaultValue={teacher?.fullName}
          onChange={(event) => {
            onInputChange({ key: "fullName", data: event.target.value });
          }}
          required
        />
      </label>
      <label htmlFor='description'>
        ??????????????
        <textarea
          id='description'
          placeholder='?????????????? ...'
          required
          defaultValue={teacher?.description}
          onChange={(event) => {
            onInputChange({ key: "description", data: event.target.value });
          }}
          rows={5}
        />
      </label>
      <label htmlFor='images'>
        ????????????
        <input
          id='description'
          placeholder='???????????? ...'
          type='file'
          onChange={onImageChange("avatar")}
        />
      </label>
      <hr />
      {teacher.body && (
        <Editor
          defaultValue={JSON.parse(teacher.body || '{"blocks":[]}')}
          onChange={async (api) => {
            const data = await api.saver.save();
            setBody(JSON.stringify(data));
          }}
        />
      )}
      <button type='submit' className=''>
        ??????
      </button>
      <button type='button' className='contrast' onClick={onTeacherRemove}>
        ??????
      </button>
    </form>
  );
}
