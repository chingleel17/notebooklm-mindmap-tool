# notebooklm-mindmap-tool

這個專案是一個用於 notebookLM 的心智圖工具 Google Chrome 擴充套件，旨在提供自動展開所有節點的功能能力。

## 特色

- 一鍵展開 notebookLM 心智圖的所有節點
- 介面簡單易用，無需額外設定

## 目錄結構

```
notebooklm-mindmap-tool
├── dist/                # 編譯後 JS
│   ├── main.js
│   ├── popup.js
│   └── types/
├── src/                 # 原始 TypeScript
│   ├── main.ts
│   ├── popup.ts
│   └── types/
├── manifest.json
├── package.json
├── tsconfig.json
├── sync-version.js
├── README.md
```

## 安裝步驟

1. 確保已安裝 Node.js 和 npm。
2. 下載或複製此專案原始碼到本地端。
3. 在專案根目錄執行以下指令以安裝相依套件：

   ```
   npm install
   ```

4. 編譯 TypeScript 原始碼：

   ```
   npm run build
   ```

5. 開啟 Google Chrome，進入 `chrome://extensions/`。
6. 開啟右上角「開發人員模式」。
7. 點擊「載入未封裝項目」，選擇本專案資料夾（根目錄）。
8. 安裝完成後，進入 notebookLM 頁面即可使用本擴充套件。

## 使用指南

- 啟動擴充套件後，進入 notebookLM 的心智圖頁面。
- 右上角會出現「展開所有節點」按鈕，點擊即可自動展開所有心智圖節點。
- 亦可使用下載功能，將心智圖資料儲存為檔案。

## 貢獻

歡迎任何形式的貢獻！請提交問題或拉取請求以協助改善本專案。

## 授權

此專案採用 MIT 授權