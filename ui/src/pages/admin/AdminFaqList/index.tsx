import { getAllFaqApiCall } from "@api/apis";
import AdminFaqItem from "@components/admin/adminFaqItem";
import Anchor from "@components/anchor";
import { useEffect, useState } from "react";
import styles from "./adminFaqListPage.module.css";

export default function AdminFaqListPage() {
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
    <div className='container'>
      <h2 className={styles.mainTitle}>لیست پرسشهای پرتکرار</h2>
      <Anchor to='/panel/faq/new'>ایجاد پاسخ جدید</Anchor>
      <hr />
      {faqs.map((faq) => (
        <AdminFaqItem
          title={faq.title}
          id={faq.id}
          key={`faq-${faq.id}`}
          summery={faq.description}
        />
      ))}
    </div>
  );
}
