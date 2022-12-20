import React from "react";

const NewsLetterLayout = () => {
  return (
    <>
      <section aria-label='Subscribe example'>
        <div className='container'>
          <article>
            <hgroup>
              <h2>عضویت در خبرنامه</h2>
            </hgroup>
            <form className='grid'>
              <input
                type='text'
                id='name'
                name='name'
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
};

export default NewsLetterLayout;
