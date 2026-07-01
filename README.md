# Van Gogh — Immersive Experience

Иммерсивный веб-сайт, посвящённый Винсенту Ван Гогу.
Видео-фон проигрывается пофреймово в зависимости от прокрутки страницы.

## Структура проекта

```
VanGog-site/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── video/
│   ├── 0.mp4
│   ├── 1.mp4
│   └── 2.mp4
└── README.md
```

## Запуск локально

```bash
npx serve .
# или
python -m http.server 8080
```

Открыть: `http://localhost:3000` (или `http://localhost:8080`)

## Деплой на GitHub Pages

1. Создать репозиторий на GitHub
2. `git init && git add . && git commit -m "Initial commit"`
3. `git remote add origin https://github.com/<username>/<repo>.git`
4. `git push -u origin main`
5. В настройках репозитория: **Settings → Pages → Branch: main / root**

Сайт будет доступен по адресу: `https://<username>.github.io/<repo>/`
