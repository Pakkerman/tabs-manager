import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  return <div className="fixed z-50 flex top-32 right-8"></div>
}

export default PlasmoOverlay
