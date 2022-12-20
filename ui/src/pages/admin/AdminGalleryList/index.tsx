import { getAllGalleriesApiCall } from "@api/apis";
import AdminGalleryItem from "@components/admin/adminGalleryItem";
import Anchor from "@components/anchor";
import { useEffect, useState } from "react";
import styles from "./adminGalleryListPage.module.css";

export default function AdminGalleryListPage() {
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
    <div className='container'>
      <h2 className={styles.mainTitle}>لیست گالری‌ها</h2>
      <Anchor to='/panel/gallery/new'>ایجاد گالری جدید</Anchor>
      <hr />
      {galleries.map((gallery) => (
        <AdminGalleryItem
          title={gallery.title}
          id={gallery.id}
          key={`gallery-${gallery.id}`}
          summery={gallery.description}
          avatarUrl={gallery.banner?.name}
          href={`/panel/gallery/${gallery.id}`}
        />
      ))}
    </div>
  );
}
