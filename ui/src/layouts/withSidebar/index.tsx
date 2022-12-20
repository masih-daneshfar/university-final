import LatestPostsLayout from "@layouts/latestPosts";
import SocialIconsLayout from "@layouts/socialIcons";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import styles from "./withSidebarLayout.module.css";

const WithSidebarLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className='container-fluid'>
      <div className={clsx(styles.gridContainer)}>
        <section>{children}</section>
        <aside>
          <LatestPostsLayout />
          <SocialIconsLayout />
        </aside>
      </div>
    </main>
  );
};

export default WithSidebarLayout;
