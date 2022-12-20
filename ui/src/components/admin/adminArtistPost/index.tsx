import Anchor from "@components/anchor";
import styles from "./adminArtistPost.module.css";

interface AdminArtistPostType {
  fullName: string;
  summery: string;
  href: string;
  avatarUrl?: string;
  id: number;
}
function AdminArtistPost({
  href = "",
  summery,
  fullName,
  avatarUrl,
}: AdminArtistPostType) {
  return (
    <>
      <div className={styles.galleryContainer}>
        <div className={styles.galleryAvatar}>
          <img src={`http://localhost:3001/uploads/${avatarUrl}`} alt='' />
        </div>
        <div className={styles.galleryInfoContainer}>
          <h3 className={styles.galleryTitle}>{fullName}</h3>
          <p className={styles.gallerySummery}>{summery}</p>
          <Anchor role='button' to={href} contrast fullWidth>
            ویرایش
          </Anchor>
        </div>
      </div>
    </>
  );
}

export default AdminArtistPost;
