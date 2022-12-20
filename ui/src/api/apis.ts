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
}: Omit<faqResponseType,"id"| "created_at">) => {
  return fetcher(`/faq/new`, {
    method: "post",
    body: JSON.stringify(data),
  }) as Promise<faqResponseType>;
};

export const updateFaqItemApiCall = async ({
  id,
  ...data
}: Omit<faqResponseType, "created_at">) => {
  return fetcher(`/faq/${id}`, {
    method: "put",
    body: JSON.stringify(data),
  }) as Promise<faqResponseType>;
};

export const removeFaqApiCall = async (faqID: number) => {
  return fetcher(`/faq/remove/${faqID}`, {
    method: "delete",
  }) as Promise<faqResponseType[]>;
};
