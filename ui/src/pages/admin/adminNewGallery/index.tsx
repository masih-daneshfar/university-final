import { newGalleryPostApiCall, uploadFiles } from "@api/apis";
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styles from "./adminNewGallery.module.css";

type galleryEntity = Awaited<ReturnType<typeof newGalleryPostApiCall>>;

export default function AdminNewGalleryPage() {
  const navigate = useNavigate();
  const [gallery, setGallery] = useState<
    Omit<galleryEntity, "id" | "created_at">
  >({
    description: "",
    title: "",
    images: [],
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
        const { id}=await newGalleryPostApiCall({ ...gallery });
        toast.success("?????????? ???? ???????????? ?????????? ????");
        navigate(`/panel/gallery/${id}`)
      } else toast.error("?????????? ?????????? ???? ?????????? ?????????? ????!");
    },
    [gallery, navigate]
  );
  return (
    <form className='container' onSubmit={onPostSubmit}>
      <h2 className={styles.mainTitle}>?????????? ??????????</h2>
      <hr />
      <label htmlFor='title'>
        ??????????
        <input
          type='text'
          id='title'
          name='title'
          placeholder='??????????'
          value={gallery?.title}
          onChange={(event) => {
            onInputChange({ key: "title", data: event.target.value });
          }}
          required
        />
      </label>
      <label htmlFor='description'>
        ??????????????
        <textarea
          id='description'
          placeholder='?????????????? ...'
          required
          value={gallery?.description}
          onChange={(event) => {
            onInputChange({ key: "description", data: event.target.value });
          }}
          rows={5}
        />
      </label>
      <label htmlFor='description'>
        ????????????
        <input
          id='banner'
          placeholder='???????????? ...'
          required
          type='file'
          onChange={onImageChange("banner")}
        />
      </label>
      <label htmlFor='images'>
        ???????????? ??????????
        <input
          id='description'
          placeholder='???????????? ?????????? ...'
          type='file'
          multiple
          onChange={onImageChange("images")}
        />
      </label>
      <hr />
      <button type='submit' className=''>
        ??????
      </button>
    </form>
  );
}
