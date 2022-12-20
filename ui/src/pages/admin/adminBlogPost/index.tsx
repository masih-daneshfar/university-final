import {
  getBlogSinglePostApiCall,
  removeBlogSinglePostApiCall,
  updateBlogSinglePostApiCall,
} from "@api/apis";
import Editor from "@components/editor";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./adminBlogPostPage.module.css";

type postEntity = Awaited<ReturnType<typeof getBlogSinglePostApiCall>>;

export default function AdminBlogPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Omit<postEntity, "id">>({
    body: "",
    created_at: "",
    description: "",
    title: "",
  });
  const [body, setBody] = useState<string>();
  useEffect(() => {
    (async () => {
      const post = await getBlogSinglePostApiCall(Number(id));
      setPost(post);
      setBody(post.body || "{}");
    })();
  }, [id]);

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
        await updateBlogSinglePostApiCall({
          ...post,
          id: Number(id!),
          body: body,
        });
        toast.success("پست با موفقیت آپدیت شد");
      } else toast.error("آپدیت پست با اشکال مواجه شد!");
    },
    [body, post, id]
  );

  const onPostRemove = useCallback(async () => {
    if (post) {
      await removeBlogSinglePostApiCall(Number(id));
      toast.success("پست با موفقیت حذف شد");
      navigate("/panel/blog");
    } else toast.error("حذف پست با اشکال مواجه شد!");
  }, [id, navigate, post]);

  return (
    <form className='container' onSubmit={onPostSubmit}>
      <h2 className={styles.mainTitle}>ویرایش پست</h2>

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
      <h5>بدنه پست</h5>
      <hr />

      <input hidden name='body' value={body} />

      {body && (
        <Editor
          defaultValue={JSON.parse(body || '{"blocks":[]}')}
          onChange={async (api) => {
            const data = await api.saver.save();
            setBody(JSON.stringify(data));
          }}
        />
      )}
      <button type='submit' className=''>
        آپدیت پست
      </button>
      <button type='button' className='contrast' onClick={onPostRemove}>
        حذف
      </button>
    </form>
  );
}
