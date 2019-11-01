const { app, BrowserWindow } = require("electron");

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  mainWindow.setMenu(null);
  mainWindow.loadURL("http://localhost:8081/");

  // mainWindow.loadFile("index.html"); // 隐藏 Chromium 菜单
  // mainWindow.webContents.openDevTools() // 开启调试模式

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  /* 在 Mac 系统用户通过 Cmd+Q 显式退出之前，保持应用程序和菜单栏处于激活状态。*/
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  /* 当 dock 图标被点击并且不会有其它窗口被打开的时候，在 Mac 系统上重新建立一个应用内的 window。*/
  if (mainWindow === null) {
    createWindow();
  }
});
