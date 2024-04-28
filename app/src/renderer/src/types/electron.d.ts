import { BrowserWindow } from "electron";

declare module "electron" {
  interface remote {
    getCurrentWindow(): BrowserWindow;
  }

  interface ElectronMainInterface {
    remote: Remote;
  }
}
