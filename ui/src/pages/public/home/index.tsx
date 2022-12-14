import WithSidebarLayout from "@layouts/withSidebar";
import SinglePostPage from "../singlePage";

export default function HomePage() {
  return (
    <WithSidebarLayout>
      <SinglePostPage postType='home' />
    </WithSidebarLayout>
  );
}
