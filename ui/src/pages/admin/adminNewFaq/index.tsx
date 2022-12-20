import { newFaqItemApiCall } from "@api/apis";
import { FormEventHandler, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "./adminNewFaq.module.css";

type faqEntity = Awaited<ReturnType<typeof newFaqItemApiCall>>;

export default function AdminNewFaq() {
  const navigate = useNavigate();
  const [faq, setFaq] = useState<Omit<faqEntity, "id" | "created_at">>({
    description: "",
    title: "",
  });
  const onInputChange = ({
    key,
    data,
  }: {
    key: keyof faqEntity;
    data: any;
  }) => {
    setFaq((prev) => ({
      ...prev,
      [key]: data,
    }));
  };

  const onPostSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      if (faq) {
        const { id } = await newFaqItemApiCall({ ...faq });
        toast.success("پرسش با موفقیت ایجاد شد");
        navigate(`/panel/faq/${id}`);
      } else toast.error("ایجاد پرسش با اشکال مواجه شد!");
    },
    [ navigate, faq]
  );
  return (
    <form className='container' onSubmit={onPostSubmit}>
      <h2 className={styles.mainTitle}>ایجاد پرسش</h2>
      <hr />
      <label htmlFor='title'>
        سوال
        <input
          type='text'
          id='title'
          name='title'
          placeholder='سوال'
          value={faq?.title}
          onChange={(event) => {
            onInputChange({ key: "title", data: event.target.value });
          }}
          required
        />
      </label>
      <label htmlFor='description'>
        پاسخ
        <textarea
          id='description'
          placeholder='پاسخ ...'
          required
          value={faq?.description}
          onChange={(event) => {
            onInputChange({ key: "description", data: event.target.value });
          }}
          rows={5}
        />
      </label>
      <hr />
      <button type='submit' className=''>
        ثبت
      </button>
    </form>
  );
}
