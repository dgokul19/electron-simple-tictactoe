const { app, BrowserWindow } = require('electron');

 let win;
 const createWindow = () => {
    win = new BrowserWindow({
        width : 1200,
        height : 800,
    })

    win.loadFile('index.html')
    // win.webContents.openDevTools();
 };

 app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})