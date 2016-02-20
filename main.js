var defaultMenu = require('electron-default-menu');
var Menu = require('menu');
var app = require('app');
var BrowserWindow = require('browser-window');
var ElectronSettings = require('electron-settings');
var settings = new ElectronSettings();
const ipcMain = require('electron').ipcMain;


ipcMain.on('settings-save', function(event, arg) {
  for(var prop in arg) {
    propValue = arg[prop]
    settings.set(prop, propValue);
  }
});

ipcMain.on('settings-load', function(event, arg) {
  var data = {
    hash: settings.get('hash'),
    username: settings.get('username'),
    caller: settings.get('caller'),
    registerSip: settings.get('registerSip')
  };

  event.sender.send('settings-loaded', data);
});

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  var menu = defaultMenu();
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));

  mainWindow = new BrowserWindow({width: 200, height: 200});

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
