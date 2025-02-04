# Its MyPic－MyGO Ave Mujica 截圖搜尋器

[網頁連結](https://mygo.0m0.uk)

## 特色與功能介紹

- 更新迅速
    - 作者會在六小時內更新最新一集的全對白截圖
- 一鍵下載圖片
- 一鍵複製圖片
    - 常按複製圖片連結
- 支援使用簡體搜尋
- 使用SSG技術預先生成靜態內容，提高載入速度

## 如何部署

1. clone本Repo

```bash
git clone --recursive https://github.com/Its-MyPic/Its-MyPic-vue.git
```

2. 安裝dependencies

```bash
cd Its-MyPic-vue
npm install
```

3. 啟動

```bash
npm run dev # 開發用

# 或

npm run build # 編譯網頁
npm run preview # 預覽編譯結果
```

## License

[MPL](./LICENSE)

本專案以MPL規範開源，歡迎大家自由使用、修改及分支開發，但請務必保留原作者署名。

## Credits

- [Vue.js](https://vuejs.org)
- [Vite](https://vitejs.dev)
- [vite-ssg](https://github.com/antfu-collective/vite-ssg)
- [Its-MyPic](https://github.com/Its-MyPic/Its-MyPic)
- [Its-MyPicDB](https://github.com/Its-MyPic/Its-MyPicDB)