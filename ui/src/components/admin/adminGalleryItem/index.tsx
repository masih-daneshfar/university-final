import Anchor from "@components/anchor";
import styles from "./adminGalleryItem.module.css";

interface AdminGalleryItemType {
  title: string;
  summery: string;
  href: string;
  avatarUrl?: string;
  id: number;
}
function AdminGalleryItem({ href = "", summery, title,avatarUrl }: AdminGalleryItemType) {
  return (
    <>
      <div className={styles.galleryContainer}>
        <div className={styles.galleryAvatar}>
          <img src={`http://localhost:3001/uploads/${avatarUrl}`} alt='' />
        </div>
        <div className={styles.galleryInfoContainer}>
          <h3 className={styles.galleryTitle}>{title}</h3>
          <p className={styles.gallerySummery}>{summery}</p>
          <Anchor role='button' to={href} contrast fullWidth>
            ویرایش
          </Anchor>
        </div>
      </div>
    </>
  );
}

export default AdminGalleryItem;
