import Directory from "../../components/directory/directory.component"
import { Outlet } from "react-router-dom"
import categories from "./categories"

const Home = () => (
  <div>
    <Outlet />
    <Directory categories={categories} />
  </div>
)

export default Home
