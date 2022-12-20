import {
  updateGalleryPostApiCall,
  removeGallerySingleApiCall,
  getSingleGalleryApiCall,
  uploadFiles,
} from "@api/apis";
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./adminGalleryPost.module.css";

type galleryEntity = Awaited<ReturnType<typeof updateGalleryPostApiCall>>;

export default function AdminGalleryPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orgGallery, setOrgGallery] =
    useState<Omit<galleryEntity, "id" | "created_at">>();
  const [gallery, setGallery] = useState<
    Partial<Omit<galleryEntity, "id" | "created_at">>
  >({
  });
  const onInputChange = ({
    key,
    data,
  }: {
    key: keyof galleryEntity;
    data: any;
  }) => {
    setGallery((prev) => ({
      ...prev,
      [key]: data,
    }));
  };

  useLayoutEffect(() => {
    (async () => {
      const gallery = await getSingleGalleryApiCall(Number(id));
      setOrgGallery(gallery);
    })();
  }, [id]);

  const onImageChange = useCallback(
    (type: "images" | "banner"): ChangeEventHandler<HTMLInputElement> =>
      async (event) => {
        const files = event.target.files;
        const formData = new FormData();
        if (!files) return;
        else if (type === "banner" && files.length === 1)
          formData.append("image", files[0]);
        else if (type === "images" && files.length > 0)
          for (let idx = 0; idx < files.length; idx++)
            formData.append(`image${idx}`, files[idx]);
        const uploadedFile = await uploadFiles(formData);
        if (!Array.isArray(uploadedFile))
          if (type === "banner")
            setGallery((prev) => ({
              ...prev,
              banner: {
                id: uploadedFile.file.id,
                extension: uploadedFile.file.extension,
                name: uploadedFile.file.name,
              },
            }));
          else
            setGallery((prev) => ({
              ...prev,
              images: [
                {
                  id: uploadedFile.file.id,
                  extension: uploadedFile.file.extension,
                  name: uploadedFile.file.name,
                },
              ],
            }));
        else
          setGallery((prev) => ({
            ...prev,
            images: uploadedFile.map((file) => ({
              id: file.id,
              extension: file.extension,
              name: file.name,
            })),
          }));
      },
    []
  );

  const onPostSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      if (gallery) {
        await updateGalleryPostApiCall({ id: Number(id), ...gallery });
        toast.success("گالری با موفقیت آپدیت شد");
      } else toast.error("آپدیت گالری با اشکال مواجه شد!");
    },
    [gallery, id]
  );

  const onGalleryRemove = useCallback(async () => {
    if (gallery) {
      await removeGallerySingleApiCall(Number(id));
      toast.success("گالری با موفقیت حذف شد");
      navigate("/panel/gallery");
    } else toast.error("حذف گالری با اشکال مواجه شد!");
  }, [id, navigate, gallery]);

  return (
    <form className='container' onSubmit={onPostSubmit}>
      <h2 className={styles.mainTitle}>ویرایش گالری</h2>
      <hr />
      <label htmlFor='title'>
        عنوان
        <input
          type='text'
          id='title'
          name='title'
          placeholder='عنوان'
          defaultValue={orgGallery?.title}
          onChange={(event) => {
            onInputChange({ key: "title", data: event.target.value });
          }}
          required
        />
      </label>
      <label htmlFor='description'>
        توضیحات
        <textarea
          id='description'
          placeholder='توضیحات ...'
          required
          defaultValue={orgGallery?.description}
          onChange={(event) => {
            onInputChange({ key: "description", data: event.target.value });
          }}
          rows={5}
        />
      </label>
      <label htmlFor='description'>
        تصویرک
        <input
          id='banner'
          placeholder='تصویرک ...'
          type='file'
          onChange={onImageChange("banner")}
        />
      </label>
      <label htmlFor='images'>
        تصاویر گالری
        <input
          id='description'
          placeholder='تصاویر گالری ...'
          type='file'
          multiple
          onChange={onImageChange("images")}
        />
      </label>
      <hr />
      <button type='submit' className=''>
        ثبت
      </button>
      <button type='button' className='contrast' onClick={onGalleryRemove}>
        حذف
      </button>
    </form>
  );
}
