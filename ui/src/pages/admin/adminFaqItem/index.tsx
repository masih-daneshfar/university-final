import { updateFaqItemApiCall, getSingleFaqApiCall, removeFaqApiCall } from "@api/apis";
import {
  FormEventHandler,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./adminFaqItem.module.css";

type faqEntity = Awaited<ReturnType<typeof updateFaqItemApiCall>>;

export default function AdminFaqItem() {
  const { id } = useParams();
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

  useLayoutEffect(() => {
    (async () => {
      const faq = await getSingleFaqApiCall(Number(id));
      setFaq({ description: faq.description, title: faq.title });
    })();
  }, [id]);

  const onPostSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      if (faq) {
        await updateFaqItemApiCall({ id: Number(id), ...faq });
        toast.success("پرسش با موفقیت آپدیت شد");
      } else toast.error("آپدیت پرسش با اشکال مواجه شد!");
    },
    [id, faq]
  );
  const onfaqRemove = useCallback(async () => {
    if (faq) {
      await removeFaqApiCall(Number(id));
      toast.success("پرسش با موفقیت حذف شد");
      navigate("/panel/faq");
    } else toast.error("حذف پرسش با اشکال مواجه شد!");
  }, [id, navigate, faq]);
  return (
    <form className='container' onSubmit={onPostSubmit}>
      <h2 className={styles.mainTitle}>آپدیت پرسش</h2>
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
      <button type='button' className='contrast' onClick={onfaqRemove}>
        حذف
      </button>
    </form>
  );
}
