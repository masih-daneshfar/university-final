import Anchor from "@components/anchor";
import styles from "./artistItem.module.css";

interface ArtistItemType {
  title?: string;
  summery?: string;
  href?: string;
  avatarUrl?: string;
}
function ArtistItem({ href = "", summery, title,avatarUrl }: ArtistItemType) {
  return (
    <>
      <div className={styles.artistContainer}>
        <div className={styles.artistAvatar}>
          <img src={`http://localhost:3001/uploads/${avatarUrl}`} alt='' />
        </div>
        <div className={styles.artistInfoContainer}>
          <h3 className={styles.artistTitle}>{title}</h3>
          <p className={styles.artistSummery}>{summery}</p>
          <Anchor to={href}>بیشتر ...</Anchor>
        </div>
      </div>
    </>
  );
}

export default ArtistItem;
