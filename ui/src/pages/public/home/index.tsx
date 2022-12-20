
import Editor from "@components/editor";
import WithSidebarLayout from "@layouts/withSidebar";

export default function HomePage() {
  return (
    <WithSidebarLayout>
      <Editor readOnly />
    </WithSidebarLayout>
  );
}
