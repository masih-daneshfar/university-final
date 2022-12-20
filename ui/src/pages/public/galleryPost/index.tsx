import { getSingleGalleryApiCall } from "@api/apis";
import Slider from "@components/slider";
import WithSidebarLayout from "@layouts/withSidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./galleryPostPage.module.css";

type galleryEntity = Awaited<ReturnType<typeof getSingleGalleryApiCall>>;

export default function GalleryPostPage() {
  const { id } = useParams();
  const [gallery, setGallery] = useState<
    Omit<galleryEntity, "id" | "created_at">
  >({ description: "", images: [], title: "" });
  useEffect(() => {
    (async () => {
      const gallery = await getSingleGalleryApiCall(Number(id));
      setGallery(gallery);
    })();
  }, [id]);
  return (
    <WithSidebarLayout>
      <h2 className={styles.mainTitle}>{gallery.title}</h2>

      <img
        className={styles.galleryBanner}
        src={`http://localhost:3001/uploads/${gallery.banner?.name}`}
        alt=''
      />
      <p className={styles.galleryDescription}>{gallery.description}</p>
      <hr />
      <Slider
        centerMode
        images={gallery.images.map(
          (item) => `http://localhost:3001/uploads/${item.name}`
        )}
      />
    </WithSidebarLayout>
  );
}
