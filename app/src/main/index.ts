import { app, shell, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    icon,
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      nodeIntegration: true,
      contextIsolation: false,
      sandbox: false,
      webSecurity: true,
      allowRunningInsecureContent: false,
      additionalArguments: ["--disable-web-security"]
    }
  });

  mainWindow.maximize();

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.executeJavaScript('require("electron").enableRemoteModule = true;');

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  electronApp.setAppUserModelId("com.electron");

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.on("ping", () => console.log("pong"));

  ipcMain.on("minimize-window", () => {
    mainWindow.minimize();
  });

  const toggleDevTools = () => {
    mainWindow.webContents.toggleDevTools();
  };

  ipcMain.on("toggle-dev-tools", toggleDevTools);

  const change = () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
      mainWindow.setSize(900, 670);
      mainWindow.center();
    } else {
      mainWindow.maximize();
    }
  };

  ipcMain.on("change-window", () => change());
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
