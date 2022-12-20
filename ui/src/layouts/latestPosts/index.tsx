import PostItem from "@components/postItem";
import styles from "./latestPostsLayout.module.css";

const LatestPostsLayout = () => {
  return (
    <article>
      <h5 className={styles.mainTitle}>آخرین اخبار آموزشگاه</h5>
      <hr />
      {[1, 2, 3].map(() => (
        <PostItem title='آخرین اخبار آموزشگاه' href='' summery='some content' />
      ))}
    </article>
  );
};

export default LatestPostsLayout;
