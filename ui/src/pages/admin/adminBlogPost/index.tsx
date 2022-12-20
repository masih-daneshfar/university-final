import Editor from "@components/editor";
import { useState } from "react";
import styles from "./adminBlogPostPage.module.css";

interface AdminBlogPostPageType {
  title?: string;
  body?: string;
  description?: string;
  banner?: string;
  id?: string;
}
export default function AdminBlogPostPage({
  title,
  banner,
  body: orgBody,
  description,
  id,
}: AdminBlogPostPageType) {
  const [body, setBody] = useState<string>();

  return (
    <form className='container'>
      {title ? (
        <h2 className={styles.mainTitle}>ویرایش پست</h2>
      ) : (
        <h2 className={styles.mainTitle}>ایجاد پست</h2>
      )}
      <hr />
      <label htmlFor='title'>
        سر تیتر
        <input
          type='text'
          id='title'
          name='title'
          placeholder='سرتیتر پست'
          defaultValue={title}
          required
        />
      </label>
      <label htmlFor='description'>
        چکیده پست
        <textarea
          id='description'
          placeholder='چکیده پست ...'
          required
          defaultValue={description}
          rows={5}
        />
      </label>
      <label htmlFor='banner'>
        تصویرک بنر
        <input
          id='banner'
          value={banner}
          placeholder='تصویرک پست ...'
          required
          name='banner'
          type='file'
        />
      </label>
      <h5>بدنه پست</h5>
      <hr />

      <input hidden name='body' value={body} />

      <Editor
        defaultValue={JSON.parse(orgBody || '{"blocks":[]}')}
        onChange={async (api) => {
          const data = await api.saver.save();
          setBody(JSON.stringify(data.blocks));
        }}
      />

      <button type='submit' className=''>
        ثبت
      </button>
      <button type='submit' className='contrast' name='remove'>
        حذف
      </button>
    </form>
  );
}
