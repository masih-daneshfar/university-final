import lockImage from "@assets/images/lock.png";
import styles from "./authPage.module.css";

export default function AuthPage() {
  return (
    <>
      <main className='container'>
        <article className='grid'>
          <div className={styles.formContainer}>
            <hgroup>
              <h1>ورود</h1>
              <h2>پنل آموزشگاه موسیقی</h2>
            </hgroup>
            <form>
              <input
                type='text'
                name='login'
                placeholder='نام کاربری'
                aria-label='Login'
                autoComplete='nickname'
                required
              />
              <input
                type='password'
                name='password'
                placeholder='کلمه عبور'
                aria-label='Password'
                autoComplete='current-password'
                required
              />
              <button type='submit' className='contrast'>
                ورود
              </button>
            </form>
          </div>
          <img className={styles.bannerImage} src={lockImage} alt=""/>
        </article>
      </main>
    </>
  );
}
