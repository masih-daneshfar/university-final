import Accordion from "@components/accordion";
import WithSidebarLayout from "@layouts/withSidebar";
import styles from "./faqPage.module.css";

export default function FaqPage() {
  return (
    <WithSidebarLayout>
      <h2 className={styles.mainTitle}>پرسشهای پرتکرار</h2>
      <hr />
      {[1, 2, 3, 4, 5, 4, 4, 33, 3, 3, 3, 3].map(() => (
        <>
          <Accordion title='یک تیتیر' />
        </>
      ))}
    </WithSidebarLayout>
  );
}
