import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import FooterLayout from '@layouts/footer';
import CenterLayout from '@layouts/center';
import styles from "./panelLayout.module.css";
import NavbarLayout from '@layouts/navbar';

const PanelLayout = () => {
  return (
    <CenterLayout>
      <div className={clsx( styles.container)}>
          <NavbarLayout isAdmin />
          <Outlet />
        <FooterLayout />
      </div>
    </CenterLayout>
  )
}

export default PanelLayout