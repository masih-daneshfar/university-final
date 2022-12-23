import { getPostByTypeApiCall } from "@api/apis";
import Editor from "@components/editor";
import { useEffect, useState } from "react";

interface SinglePostPageType {
  postType: "about" | "home";
}

export default function SinglePostPage({ postType }: SinglePostPageType) {
  const [post, setPost] =
    useState<Awaited<ReturnType<typeof getPostByTypeApiCall>>>();
  useEffect(() => {
    (async () => {
      const post = await getPostByTypeApiCall(postType);
      setPost(post);
    })();
  }, [postType]);

  return (
    <>
      {post?.body && <Editor readOnly defaultValue={JSON.parse(post.body)} />}
    </>
  );
}
