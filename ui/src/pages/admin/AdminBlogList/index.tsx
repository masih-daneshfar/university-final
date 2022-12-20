import { getAllPostsApiCall } from "@api/apis";
import AdminPostItem from "@components/admin/adminPostItem";
import Anchor from "@components/anchor";
import { useEffect, useState } from "react";
import styles from "./adminBlogListPage.module.css";

export default function AdminBlogListPage() {
  const [posts, setPosts] = useState<
    Awaited<ReturnType<typeof getAllPostsApiCall>>
  >([]);
  useEffect(() => {
    (async () => {
      const posts = await getAllPostsApiCall();
      setPosts(posts);
    })();
  }, []);
  return (
    <div className='container'>
      <h2 className={styles.mainTitle}>لیست پست های بلاگ</h2>
      <Anchor to='/panel/blog/new'>ایجاد پست جدید</Anchor>
      <hr />
      {posts.map((post) => (
        <AdminPostItem
          title={post.title}
          id={post.id}
          key={`blog-${post.id}`}
          summery={post.description}
        />
      ))}
    </div>
  );
}
