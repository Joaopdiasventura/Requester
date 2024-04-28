import { useCallback } from "react";
import icon from "../../../../resources/icon.png";
const { ipcRenderer } = window.require("electron");

export function HeaderComponent(): JSX.Element {
  const handleCloseWindow = useCallback(() => {
    window.close();
  }, []);

  const handleMinimizeWindow = useCallback(() => {
    ipcRenderer.send("minimize-window");
  }, []);

  const handleChangeWindow = useCallback(() => {
    ipcRenderer.send("change-window");
  }, []);

  return (
    <header className=" flex flex-row items-center justify-between p-1 w-full">
      <div className="flex items-center gap-1">
        <img src={icon} alt="" className="w-6" />
      </div>
      <div className="flex gap-2">
        <button className="text-center" onClick={handleChangeWindow}>
          🟢
        </button>
        <button className="text-center" onClick={handleMinimizeWindow}>
          🟡
        </button>
        <button className="text-center" onClick={handleCloseWindow}>
          🔴
        </button>
      </div>
    </header>
  );
}
