import DefaultLayout from "@layouts/default";
import PanelLayout from "@layouts/panel";
import AdminBlogListPage from "@pages/admin/AdminBlogList";
import ArtistListPage from "@pages/public/artistList";
import ArtistPostPage from "@pages/public/artistPost";
import AuthPage from "@pages/auth";
import BlogListPage from "@pages/public/blogList";
import BlogPostPage from "@pages/public/blogPost";
import ClassesPage from "@pages/public/classes";
import FaqPage from "@pages/public/faq";
import GalleryPage from "@pages/public/gallery";
import GalleryPostPage from "@pages/public/galleryPost";
import HomePage from "@pages/public/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminBlogPostPage from "@pages/admin/adminBlogPost";



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
        path: "/auth",
        element: <AuthPage />,
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
    ],
  },
]);
function App() {
  return (<>
    <RouterProvider router={router} />
  </>
  );
}

export default App;
