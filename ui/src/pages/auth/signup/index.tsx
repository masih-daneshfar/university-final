import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import lockImage from "@assets/images/lock.png";
import styles from "./authSignupPage.module.css";
import { signupApiCall} from "@api/apis";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "context";
import Anchor from "@components/anchor";

interface signupDataType {
  username: string;
  password: string;
}

export default function AuthSignupPage() {
  const { currentUser, updateUserInfo } = useGlobalContext();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<signupDataType>({
    password: "",
    username: "",
  });
  const [formLoading, setFormLoading] = useState<boolean>(false);

  const goToLogin = useCallback(() => navigate("/auth/login"), [navigate]);
  const goToPanel = useCallback(() => navigate("/panel"), [navigate]);

  useEffect(() => {
    if (currentUser.loggedIn) goToPanel();
  }, [currentUser.loggedIn, goToPanel]);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setLoginData((prev) => ({
      ...prev,
      [inputName]: inputValue,
    }));
  };
  const onSubmitLogin: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      setFormLoading(true);
      await signupApiCall(loginData);
      await updateUserInfo();
      setFormLoading(false);
      goToLogin();
    },
    [goToLogin, loginData, updateUserInfo]
  );
  return (
    <>
      <main className='container'>
        <article className='grid'>
          <div className={styles.formContainer}>
            <hgroup>
              <h1>ثبت‌نام</h1>
              <h2>پنل آموزشگاه موسیقی</h2>
            </hgroup>
            <form onSubmit={onSubmitLogin}>
              <input
                type='username'
                name='username'
                placeholder='نام کاربری'
                aria-label='username'
                autoComplete='username'
                required
                onChange={onInputChange}
                value={loginData.username}
              />
              <input
                type='text'
                name='password'
                placeholder='کلمه عبور'
                aria-label='Password'
                autoComplete='current-password'
                required
                onChange={onInputChange}
                value={loginData.password}
              />
              <button
                type='submit'
                className='contrast'
                aria-busy={formLoading}
              >
                ثبت‌نام
              </button>
              <Anchor role={"button"} fullWidth contrast to='/auth/login'>
                ورود
              </Anchor>
            </form>
          </div>
          <img className={styles.bannerImage} src={lockImage} alt='' />
        </article>
      </main>
    </>
  );
}
