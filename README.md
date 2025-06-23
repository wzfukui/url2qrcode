# URL to QRCode Extension

This repository contains a Chrome extension that converts the current tab URL into a QR code.

## Features

- Popup page displays a QR code for the active tab URL.
- Context menu item "生成二维码" (Generate QR code) sends the page selection to the content script.
- Keyboard shortcut `Ctrl+Q` (`MacCtrl+F` on macOS) opens the popup.

The extension source lives in the `extension/` directory and targets Manifest V3.
