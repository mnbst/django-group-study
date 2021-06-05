# 勉強会
## step1: Djangoの環境構築
### 要件
docker composeでローカルサーバーの立ち上げ

Djangoのデフォルト画面の表示

### 設計

- appディレクトリの作成

```
.
├── django
├── docker
│   ├── django
│   └── vue
├── docker-compose.yml
├── requirements.txt
└── vue
```

- Djangoプロジェクト作成

`docker compose run python django-admin startproject app .`

- ブラウザ表示

`docker compose up`
