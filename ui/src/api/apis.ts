import fetcher from "@utilities/fetcher";
import { toast } from "react-hot-toast";

interface postResponseType {
  id: number;
  title: string;
  description: string;
  body: string;
  banner?: { name: string };
  created_at: string;
}

interface faqResponseType {
  id: number;
  title: string;
  description: string;
}
interface fileType {
  id: number;
  name: string;
  extension: string;
}
interface uploadFileResponseType {
  created_at: string;
  extension: string;
  id: number;
  name: string;
  url: string;
}
interface uploadSingleResponseType {
  file: uploadFileResponseType;
}

interface galleryResponseType {
  id: number;
  title: string;
  description: string;
  banner?: fileType;
  images: fileType[];
  created_at: string;
}
interface subscribeResponseType {
  id: number;
  email: string;
  fullName: string;
  created_at: string;
}
interface teacherResponseType {
  id: number;
  fullName: string;
  description: string;
  avatar: fileType;
  body: string;
  created_at: string;
}

export const subscribeApiCall = async (
  data: Pick<subscribeResponseType, "email" | "fullName">
) => {
  return fetcher(`/subscribe/new`, {
    method: "post",
    body: JSON.stringify(data),
  }) as Promise<galleryResponseType>;
};

export const loginApiCall = async (
  loginData: { username: string; password: string },
  onSuccess: Function = () => {}
) => {
  try {
    const loginResponse = await fetcher("/auth/signin", {
      method: "post",
      body: JSON.stringify(loginData),
    });
    toast.success(loginResponse?.message || "ورود شما موفقیت آمیز بود");
    onSuccess();
  } catch (error) {
    toast.error(String(error));
  }
};

export const logoutApiCall = async (onSuccess: Function = () => {}) => {
  try {
    const loginResponse = await fetcher("/auth/signout", {
      method: "post",
    });
    toast.success(loginResponse?.message || "خروج شما موفقیت آمیز بود");
    onSuccess();
  } catch (error) {
    toast.error(String(error));
  }
};
export const getProfileApiCall = async () => {
  return fetcher("/auth/profile", {
    method: "get",
  }) as Promise<{
    user: {
      id: number;
      firstName: string;
      lastName: string;
      username: string;
      role: "ADMIN" | "USER";
    };
  }>;
};

export const uploadFiles = async (formData: FormData) => {
  return fetcher("/file/new", {
    method: "post",
    body: formData,
    headers: {},
  }) as Promise<uploadSingleResponseType | uploadFileResponseType[]>;
};

export const getLatestPostsApiCall = async () => {
  return fetcher("/post/latest", {
    method: "get",
  }) as Promise<postResponseType[]>;
};

export const getAllPostsApiCall = async () => {
  return fetcher("/post", {
    method: "get",
  }) as Promise<postResponseType[]>;
};

export const getBlogSinglePostApiCall = async (postID: number) => {
  return fetcher(`/post/${postID}`, {
    method: "get",
  }) as Promise<postResponseType>;
};

export const updateBlogSinglePostApiCall = async ({
  id,
  ...data
}: Partial<Omit<postResponseType, "banner">>) => {
  return fetcher(`/post/update/${id}`, {
    method: "put",
    body: JSON.stringify(data),
  }) as Promise<postResponseType>;
};
export const removeBlogSinglePostApiCall = async (postID: number) => {
  return fetcher(`/post/remove/${postID}`, {
    method: "delete",
  }) as Promise<postResponseType>;
};

export const newBlogSinglePostApiCall = async ({
  ...data
}: Partial<Omit<postResponseType, "banner" | "id">>) => {
  return fetcher(`/post/new`, {
    method: "post",
    body: JSON.stringify(data),
  }) as Promise<postResponseType>;
};

export const getAllFaqApiCall = async () => {
  return fetcher(`/faq`, {
    method: "get",
  }) as Promise<faqResponseType[]>;
};

export const getSingleFaqApiCall = async (faqID: number) => {
  return fetcher(`/faq/${faqID}`, {
    method: "get",
  }) as Promise<faqResponseType>;
};

export const newFaqItemApiCall = async ({
  ...data
}: Omit<faqResponseType, "id" | "created_at">) => {
  return fetcher(`/faq/new`, {
    method: "post",
    body: JSON.stringify(data),
  }) as Promise<faqResponseType>;
};

export const updateFaqItemApiCall = async ({
  id,
  ...data
}: Omit<faqResponseType, "created_at">) => {
  return fetcher(`/faq/update/${id}`, {
    method: "put",
    body: JSON.stringify(data),
  }) as Promise<faqResponseType>;
};

export const removeFaqApiCall = async (faqID: number) => {
  return fetcher(`/faq/remove/${faqID}`, {
    method: "delete",
  }) as Promise<faqResponseType[]>;
};

export const getAllGalleriesApiCall = async () => {
  return fetcher(`/gallery`, {
    method: "get",
  }) as Promise<galleryResponseType[]>;
};
export const getSingleGalleryApiCall = async (galleryID: number) => {
  return fetcher(`/gallery/${galleryID}`, {
    method: "get",
  }) as Promise<galleryResponseType>;
};

export const newGalleryPostApiCall = async ({
  ...data
}: Omit<galleryResponseType, "id" | "created_at">) => {
  return fetcher(`/gallery/new`, {
    method: "post",
    body: JSON.stringify(data),
  }) as Promise<galleryResponseType>;
};
export const updateGalleryPostApiCall = async ({
  id,
  ...data
}: Partial<Omit<galleryResponseType, "created_at">>) => {
  return fetcher(`/gallery/update/${id}`, {
    method: "put",
    body: JSON.stringify(data),
  }) as Promise<galleryResponseType>;
};

export const removeGallerySingleApiCall = async (galleryID: number) => {
  return fetcher(`/gallery/remove/${galleryID}`, {
    method: "delete",
  }) as Promise<galleryResponseType>;
};

export const getAllTeachersApiCall = async () => {
  return fetcher(`/teacher`, {
    method: "get",
  }) as Promise<teacherResponseType[]>;
};
export const getSingleTeacherApiCall = async (galleryID: number) => {
  return fetcher(`/teacher/${galleryID}`, {
    method: "get",
  }) as Promise<teacherResponseType>;
};

export const newTeacherPostApiCall = async ({
  ...data
}: Omit<teacherResponseType, "id" | "created_at">) => {
  return fetcher(`/teacher/new`, {
    method: "post",
    body: JSON.stringify(data),
  }) as Promise<teacherResponseType>;
};
export const updateTeacherPostApiCall = async ({
  id,
  ...data
}: Partial<Omit<teacherResponseType, "created_at">>) => {
  return fetcher(`/teacher/update/${id}`, {
    method: "put",
    body: JSON.stringify(data),
  }) as Promise<teacherResponseType>;
};

export const removeTeacherSingleApiCall = async (galleryID: number) => {
  return fetcher(`/teacher/remove/${galleryID}`, {
    method: "delete",
  }) as Promise<teacherResponseType>;
};
