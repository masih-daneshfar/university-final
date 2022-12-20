import { subscribeApiCall } from "@api/apis";
import React, { FormEventHandler } from "react";
import { toast } from "react-hot-toast";
import reactUseCookie from "react-use-cookie";

const NewsLetterLayout = () => {
  const [isSubscribed, setIsSubscribed] = reactUseCookie(
    "subscribe-cookie",
    "false"
  );
  const onSubscribeSubmit: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const data = Object.fromEntries(
      new FormData(event.target as HTMLFormElement)
    ) as Record<"fullName" | "email", string>;
    try {
      await subscribeApiCall(data);
      setIsSubscribed("true", { days: 365 });
      toast.success(`${data.fullName}، با موفقیت به لیست خبرنامه پیوستید`);
    } catch (error) {
      toast.error(`${data.fullName}، پیوستن به خبرنامه با اشکال مواجه شد!`);
    }
  };
  if (isSubscribed === "false")
    return (
      <>
        <section aria-label='Subscribe example'>
          <div className='container'>
            <article>
              <hgroup>
                <h2>عضویت در خبرنامه</h2>
              </hgroup>
              <form className='grid' onSubmit={onSubscribeSubmit}>
                <input
                  type='text'
                  id='fullName'
                  name='fullName'
                  placeholder='نام و نام خانوادگی'
                  aria-label='نام و نام خانوادگی'
                  required
                />
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='ایمیل'
                  aria-label='ایمیل'
                  required
                />
                <button type='submit'>عضویت</button>
              </form>
            </article>
          </div>
        </section>
      </>
    );
  return <></>;
};

export default NewsLetterLayout;
