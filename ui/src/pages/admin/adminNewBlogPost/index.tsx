import { newBlogSinglePostApiCall } from "@api/apis";
import Editor from "@components/editor";
import { FormEventHandler, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "./adminNewBlogPostPage.module.css";

type postEntity = Awaited<ReturnType<typeof newBlogSinglePostApiCall>>;

export default function AdminNewBlogPostPage() {
  const navigate = useNavigate();
  const [post, setPost] = useState<Omit<postEntity, "id" | "created_at">>({
    body: "{}",
    description: "",
    title: "",
    type: "normal",
  });
  const [body, setBody] = useState<string>();
  const onInputChange = ({
    key,
    data,
  }: {
    key: keyof postEntity;
    data: any;
  }) => {
    setPost((prev) => ({
      ...prev,
      [key]: data,
    }));
  };

  const onPostSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      if (post) {
        const { id } = await newBlogSinglePostApiCall({ ...post, body: body });
        toast.success("پست با موفقیت ایجاد شد");
        navigate(`/panel/blog/${id}`);
      } else toast.error("ایجاد پست با اشکال مواجه شد!");
    },
    [body, navigate, post]
  );
  return (
    <form className='container' onSubmit={onPostSubmit}>
      <h2 className={styles.mainTitle}>ایجاد پست</h2>
      <hr />
      <label htmlFor='title'>
        سر تیتر
        <input
          type='text'
          id='title'
          name='title'
          placeholder='سرتیتر پست'
          value={post?.title}
          onChange={(event) => {
            onInputChange({ key: "title", data: event.target.value });
          }}
          required
        />
      </label>
      <label htmlFor='description'>
        چکیده پست
        <textarea
          id='description'
          placeholder='چکیده پست ...'
          required
          value={post?.description}
          onChange={(event) => {
            onInputChange({ key: "description", data: event.target.value });
          }}
          rows={5}
        />
      </label>

      <label htmlFor='postType'> نوع پست</label>
      <select
        id='postType'
        name='type'
        onChange={(event) => {
          onInputChange({
            key: "type",
            data: event.target.selectedOptions[0].value,
          });
        }}
      >
        <option value='' selected={post?.type === "normal"}>
          پست معمولی
        </option>
        <option value='home' selected={post?.type === "home"}>
          خانه
        </option>
        <option value='about' selected={post?.type === "about"}>
          درباره ما
        </option>
      </select>

      <h5>بدنه پست</h5>
      <hr />

      <input hidden name='body' value={body} />

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
