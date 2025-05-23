// import logo from "./logo.svg"
import { Routes, Route } from "react-router-dom"
import Home from "./routes/home/home.component"
import Navigation from "./routes/navigation/navigation.component"
import Auth from "./routes/auth/auth.component"

const Shop = () => <h1>I am the Shop component.</h1>

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Auth />} />
      </Route>
    </Routes>
  )
}

export default App
