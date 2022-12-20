import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import styles from './centerLayout.module.css'

const CenterLayout = ({children}:PropsWithChildren) => {
  return (
    <div className={clsx(styles.container)}>{children}</div>
  )
}

export default CenterLayout