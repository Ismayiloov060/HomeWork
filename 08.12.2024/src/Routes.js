import Catalog from "./components/Catalog/Catalog";
import Home from "./components/Home/Home";
import Product from "./components/Product/Product";
import About from "./components/About/About"
import News from "./components/News/News"

const Routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/catalog",
    element: <Catalog/>,
  },
  {
    path: "/product/:title",
    element: <Product/>,
  },
  {
    path: "/news",
    element: <News />,
  },
  {
    path: "/about",
    element: <About />,
  },

];



export default Routes;