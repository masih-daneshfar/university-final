import SinglePostLayout from "@layouts/singlePost";
import WithSidebarLayout from "@layouts/withSidebar";

export default function HomePage() {
  return (
    <WithSidebarLayout>
      <SinglePostLayout />
    </WithSidebarLayout>
  );
}
