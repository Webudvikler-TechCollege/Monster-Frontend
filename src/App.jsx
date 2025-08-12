import { Footer } from "./components/Footer/Footer"
import { Header } from "./components/Header/Header"
import { Main } from "./components/Main/Main"
import { Wrapper } from "./components/Wrapper/Wrapper"
import { AppRouter } from "./router/AppRouter"

function App() {

  return (
    <Wrapper width="5xl">
      <Header />
      <Main>
        <AppRouter />
      </Main>
      <Footer />
    </Wrapper>
  )
}

export default App
