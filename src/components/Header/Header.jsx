import { LoginInfo } from "../LoginInfo/LoginInfo"
import { NavBar } from "../NavBar/NavBar"

export const Header = () => {
  return (
    <header className="w-full p-4 flex justify-between">
        <img src='/images/monster-logo.png' className="max-w-[300px]"/>
        <NavBar />
        <LoginInfo />
    </header>
  )
}
