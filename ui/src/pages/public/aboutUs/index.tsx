import WithSidebarLayout from "@layouts/withSidebar";
import SinglePostPage from "../singlePage";

export default function AboutUsPage() {
  return (
    <WithSidebarLayout>
      <SinglePostPage postType='about' />
    </WithSidebarLayout>
  );
}
