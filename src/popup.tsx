import { useEffect, useState } from "react"

import "~style.css"

function IndexPopup() {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[] | null>(null)

  useEffect(() => {
    chrome.tabs
      .query({
        url: [
          "https://developer.chrome.com/docs/webstore/*",
          "https://developer.chrome.com/docs/extensions/*"
        ]
      })
      .then((data) => {
        const collator = new Intl.Collator()
        setTabs(data.sort((a, b) => collator.compare(a.title, b.title)))
      })
      .catch((error) => console.log(error))
  }, [])

  const handleListItemClick = async (id: number, windowId: number) => {
    await chrome.tabs.update(id, { active: true })
    await chrome.windows.update(windowId, { focused: true })
  }

  const groupTabs = async () => {
    const tabIds = tabs.map((item) => item.id)
    const group = await chrome.tabs.group({ tabIds })
    await chrome.tabGroups.update(group)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 w-72">
      <h1 className="text-xl ">Google Dev Docs</h1>
      <ul className="flex flex-col items-center justify-center w-full h-full ">
        {tabs &&
          tabs.map((item, idx) => (
            <li
              className="p-2 transition-all cursor-pointer odd:bg-slate-300/50 hover:bg-orange-100 "
              onClick={() => handleListItemClick(item.id, item.windowId)}>
              <h3 className="text-sm font-bold">{item.title.split("-")[0]}</h3>
              <p>{item.url.split("/docs")[1]}</p>
            </li>
          ))}
      </ul>
      <button
        onClick={groupTabs}
        className="px-3 py-2 transition-all border rounded-lg border-slate-800/20 bg-slate-400 text-slate-100 hover:bg-slate-600 active:bg-slate-400">
        Group tabs
      </button>
    </div>
  )
}

export default IndexPopup
