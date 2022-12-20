import { getBlogSinglePostApiCall } from "@api/apis";
import Editor from "@components/editor";
import WithSidebarLayout from "@layouts/withSidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./blogPostPage.module.css";

type postEntity = Awaited<ReturnType<typeof getBlogSinglePostApiCall>>;

export default function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Omit<postEntity, "id">>({
    body: "",
    created_at: "",
    description: "",
    title: "",
  });
  useEffect(() => {
    (async () => {
      const post = await getBlogSinglePostApiCall(Number(id));
      setPost(post);
    })();
  }, [id]);
  return (
    <WithSidebarLayout>
      <h2 className={styles.mainTitle}>{post.title}</h2>
      <p>{post.description}</p>
      <h6>
        {post?.created_at && (
          <>
            <kbd>
              انتشار در
              {new Date(post.created_at).toLocaleString("fa")}
            </kbd>
          </>
        )}
      </h6>
      <hr />
      {post.body && <Editor readOnly defaultValue={JSON.parse(post.body)} />}
    </WithSidebarLayout>
  );
}
