import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import DefaultLayout from "@layouts/default";
import PanelLayout from "@layouts/panel";
import AdminBlogListPage from "@pages/admin/AdminBlogList";
import ArtistListPage from "@pages/public/artistList";
import ArtistPostPage from "@pages/public/artistPost";
import AuthLoginPage from "@pages/auth/login";
import BlogListPage from "@pages/public/blogList";
import BlogPostPage from "@pages/public/blogPost";
import ClassesPage from "@pages/public/classes";
import FaqPage from "@pages/public/faq";
import GalleryPage from "@pages/public/gallery";
import GalleryPostPage from "@pages/public/galleryPost";
import HomePage from "@pages/public/home";
import AdminBlogPostPage from "@pages/admin/adminBlogPost";
import GlobalContextProvider from "context";
import AdminNewBlogPostPage from "@pages/admin/adminNewBlogPost";
import AdminFaqListPage from "@pages/admin/AdminFaqList";
import AdminNewFaq from "@pages/admin/adminNewFaq";
import AdminFaqItem from "@pages/admin/adminFaqItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/faq",
        element: <FaqPage />,
      },
      {
        path: "/blog",
        element: <BlogListPage />,
      },
      {
        path: "/blog/:id",
        element: <BlogPostPage />,
      },
      {
        path: "/artists",
        element: <ArtistListPage />,
      },
      {
        path: "/artists/:id",
        element: <ArtistPostPage />,
      },
      {
        path: "/classes",
        element: <ClassesPage />,
      },
      {
        path: "/gallery",
        element: <GalleryPage />,
      },
      {
        path: "/gallery/:id",
        element: <GalleryPostPage />,
      },
      {
        path: "/auth/login",
        element: <AuthLoginPage />,
      },
    ],
  },
  {
    path: "/panel",
    element: <PanelLayout />,
    children: [
      {
        path: "/panel/blog",
        element: <AdminBlogListPage />,
      },
      {
        path: "/panel/blog/:id",
        element: <AdminBlogPostPage />,
      },
      {
        path: "/panel/blog/new",
        element: <AdminNewBlogPostPage />,
      },
      {
        path: "/panel/faq",
        element: <AdminFaqListPage />,
      },
      {
        path: "/panel/faq/:id",
        element: <AdminFaqItem />,
      },
      {
        path: "/panel/faq/new",
        element: <AdminNewFaq />,
      },
    ],
  },
]);
function App() {
  return (
    <GlobalContextProvider>
      <RouterProvider router={router} />
      <Toaster />
    </GlobalContextProvider>
  );
}

export default App;
