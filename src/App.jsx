import { lazy, Suspense } from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import Loader from "./Components/Loader";




const Analytics =lazy(()=>import("./Components/Analytics"));
const LandCard = lazy(() => import("./Components/Landcard"));
const ViewAllLands = lazy(() => import("./Components/ViewAllLands"));
const LandOverview=lazy(()=>import("./Components/LandOverview"));

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
     
    },
    {
        path:"",
        element:<ProtectedRoute/>,
        children: [
          {
            path: "landbank",
            element: (<Suspense fallback={<Loader />}>
              <LandCard/>
            </Suspense>),
          },
          {
            path: "view-all",
            element: (<Suspense fallback={<Loader />}>
              <ViewAllLands />
            </Suspense>)
          },
          {
            path: "analytics",
            element: (<Suspense fallback={<Loader />}>
              <Analytics />
            </Suspense>)
          },
          {
            path: "land-overview",
            element: (<Suspense fallback={<Loader />}>
              <LandOverview />
            </Suspense>)
          }
        ]
      
    },

    {
      
      
       
    }
  ])

  return (
    <>
      <RouterProvider router={appRouter} />
     
    </>
  )
}

export default App
