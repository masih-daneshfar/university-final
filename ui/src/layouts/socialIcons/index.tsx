import whatsappImage from "@assets/images/whatsapp.png";
import sorooshImage from "@assets/images/soroosh.png";
import baleImage from "@assets/images/bale.png";
import instagramImage from "@assets/images/instagram.png";
import esamandehiImage from "@assets/images/esamandehi.png";
import enamadImage from "@assets/images/enamad.png";
import Anchor from "@components/anchor";
import styles from "./socialIconsLayout.module.css";

function SocialIconsLayout() {
  return (
    <>
      <div className={styles.socialMediaContainer}>
        <Anchor to={"https://wa.me/+989901234567"} external target='_blank'>
          <img className={styles.socialMediaIcon} src={whatsappImage} alt='' />
        </Anchor>
        <Anchor to={"https://splus.ir/mypage"} external target='_blank'>
          <img className={styles.socialMediaIcon} src={sorooshImage} alt='' />
        </Anchor>
        <Anchor to={"https://bale.ai/mypage"} external target='_blank'>
          <img className={styles.socialMediaIcon} src={baleImage} alt='' />
        </Anchor>
        <Anchor to={"https://instagram.com/mypage"} external target='_blank'>
          <img className={styles.socialMediaIcon} src={instagramImage} alt='' />
        </Anchor>
      </div>
      <div className={styles.trustSignContainer}>
        <Anchor
          to={
            "https://trustseal.enamad.ir/?id=230233&Code=jZHbJr5tHOomKs6ZXitd"
          }
          external
          target='_blank'
        >
          <img className={styles.trustSignIcon} src={esamandehiImage} alt='' />
        </Anchor>
        <Anchor
          to={
            "https://trustseal.enamad.ir/?id=230233&Code=jZHbJr5tHOomKs6ZXitd"
          }
          external
          target='_blank'
        >
          <img className={styles.trustSignIcon} src={enamadImage} alt='' />
        </Anchor>
      </div>
    </>
  );
}

export default SocialIconsLayout;
