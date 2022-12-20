import { getAllPostsApiCall } from "@api/apis";
import PostItem from "@components/postItem";
import WithSidebarLayout from "@layouts/withSidebar";
import { useEffect, useState } from "react";
import styles from "./blogListPage.module.css";

export default function BlogListPage() {
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
    <WithSidebarLayout>
      <h2 className={styles.mainTitle}>بلاگ آموزشگاه</h2>
      <hr />
      {posts.map((post) => (
        <PostItem
          key={`blog-${post.id}`}
          title={post.title}
          summery={post.description}
          href={`/blog/${post.id}`}
        />
      ))}
    </WithSidebarLayout>
  );
}
