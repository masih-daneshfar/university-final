import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import FooterLayout from '@layouts/footer';
import CenterLayout from '@layouts/center';
import styles from './defaultLayout.module.css'
import NavbarLayout from '@layouts/navbar';
import NewsLetterLayout from '@layouts/newsLetter';

const DefaultLayout = () => {
  return (
    <CenterLayout>
      <div className={clsx( styles.container)}>
          <NavbarLayout />
          <Outlet />
        <NewsLetterLayout/>
        <FooterLayout />
      </div>
    </CenterLayout>
  )
}

export default DefaultLayout