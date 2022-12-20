import { getAllFaqApiCall } from "@api/apis";
import Accordion from "@components/accordion";
import WithSidebarLayout from "@layouts/withSidebar";
import { useEffect, useState } from "react";
import styles from "./faqPage.module.css";

export default function FaqPage() {
  const [faqs, setFaqs] = useState<
    Awaited<ReturnType<typeof getAllFaqApiCall>>
  >([]);
  useEffect(() => {
    (async () => {
      const posts = await getAllFaqApiCall();
      setFaqs(posts);
    })();
  }, []);
  return (
    <WithSidebarLayout>
      <h2 className={styles.mainTitle}>پرسشهای پرتکرار</h2>
      <hr />
      {faqs.map((faq) => (
        <Accordion key={`faq-${faq.id}`} title={faq.title}>
          {faq.description}
        </Accordion>
      ))}
    </WithSidebarLayout>
  );
}
