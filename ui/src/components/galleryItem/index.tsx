import Anchor from "@components/anchor";
import styles from "./galleryItem.module.css";

interface GalleryItemType {
  title?: string;
  summery?: string;
  href?: string;
  avatarUrl?: string;
}
function GalleryItem({ href = "", summery, title,avatarUrl }: GalleryItemType) {
  return (
    <>
      <div className={styles.galleryContainer}>
        <div className={styles.galleryAvatar}>
          <img src={avatarUrl} alt='' />
        </div>
        <div className={styles.galleryInfoContainer}>
          <h3 className={styles.galleryTitle}>{title}</h3>
          <p className={styles.gallerySummery}>{summery}</p>
          <Anchor to={href}>باقی تصاویر ...</Anchor>
        </div>
      </div>
    </>
  );
}

export default GalleryItem;
