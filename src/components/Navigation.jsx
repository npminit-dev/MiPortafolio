import IconLinks from "./IconLinks";
import SectionsLinks from "./SectionsLinks";
import { useContext, useEffect } from "react";
import { themeContext } from "./ThemeContext";



export default function Navigation() {

  const { theme } = useContext(themeContext)

  return (
    <nav id="navigation">
      <span id="navigation_title">MyPortfolio</span>
      <SectionsLinks></SectionsLinks>
      <IconLinks></IconLinks>
    </nav>
  )
}