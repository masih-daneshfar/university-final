import { getLatestPostsApiCall } from "@api/apis";
import PostItem from "@components/postItem";
import { useEffect, useState } from "react";
import styles from "./latestPostsLayout.module.css";

const LatestPostsLayout = () => {
  const [latestPosts, setLatestPosts] = useState<
    Awaited<ReturnType<typeof getLatestPostsApiCall>>
  >([]);
  useEffect(() => {
    (async () => {
      const posts = await getLatestPostsApiCall();
      setLatestPosts(posts);
    })();
  }, []);

  return (
    <article>
      <h5 className={styles.mainTitle}>آخرین اخبار آموزشگاه</h5>
      <hr />
      {latestPosts.map((post) => (
        <PostItem
          key={`latest-news-${post.id}`}
          title={post.title}
          href={`/blog/${post.id}`}
          summery={post.description}
        />
      ))}
    </article>
  );
};

export default LatestPostsLayout;
