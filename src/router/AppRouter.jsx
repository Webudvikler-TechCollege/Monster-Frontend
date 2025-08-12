import { Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/HomePage/HomePage"
import { LoginPage } from "../pages/LoginPage/LoginPage"

export const AppRouter = () => {
  return (
    <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
    </Routes>
  )
}
