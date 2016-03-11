# Sipgate Callme HTML-DesktopApp
## Was ist das?
Eine Desktop-App für Telefon zu Telefon Anrufe über Sipgate.

## HowTo use
1. npm install
2. npm start
3. Einstellungen vornehmen

- Username - aus dem Weblogin
- Password - aus dem Weblogin
- SIP-ID - SIP-ID vom jeweligen Endgerät  http://teamhelp.sipgate.de/hc/de/articles/203643481-Allgemeine-Konfigurationsdaten
- Telnr- deine Handynummer

## HowTo package
1. npm install electron-packager -g

Mac OSX
```
electron-packager . sipgate-callme --platform=darwin --arch=x64 --version=0.36.8
```
Linux
```
electron-packager . sipgate-callme --platform=linux --arch=x64 --version=0.36.8
```
[ ![Codeship Status for sveba/sipgate-callme](https://codeship.com/projects/94630e10-c9e4-0133-f004-0aabfff4550a/status?branch=master)](https://codeship.com/projects/139827)
