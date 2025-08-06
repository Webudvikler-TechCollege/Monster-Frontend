import { HomePage } from "../pages/HomePage/HomePage"

export const AppRouter = () => {
  return (
    <Routes>
        <Route index element={<HomePage />}></Route>
    </Routes>
  )
}
