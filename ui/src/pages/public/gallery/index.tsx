import { getAllGalleriesApiCall } from "@api/apis";
import GalleryItem from "@components/galleryItem";
import WithSidebarLayout from "@layouts/withSidebar";
import { useEffect, useState } from "react";
import styles from "./galleryPage.module.css";

export default function GalleryPage() {
   const [galleries, setGalleries] = useState<
     Awaited<ReturnType<typeof getAllGalleriesApiCall>>
   >([]);
   useEffect(() => {
     (async () => {
       const galleries = await getAllGalleriesApiCall();
       setGalleries(galleries);
     })();
   }, []);
  return (
    <WithSidebarLayout>
      <h2 className={styles.mainTitle}>گالری تصاویر</h2>
      <hr />

      {galleries.map((gallery) => (
        <GalleryItem
          key={`gallery-${gallery.id}`}
          title={gallery.title}
          avatarUrl={gallery.banner?.name}
          href={`/gallery/${gallery.id}`}
          summery={gallery.description}
        />
      ))}
    </WithSidebarLayout>
  );
}
