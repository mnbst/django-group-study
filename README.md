# 勉強会

## 準備

### npmの導入

```bash
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
$ brew update
$ brew install node
$ (brew upgrade node)
```

### vscodeを使用する場合の設定

2. 必要なプラグイン → Django/Django Template/Python/Pylance/Beautify/Vetur
5. インタープリタでPython3最新を選び、フォーマッタにblackを選択する。
3. settings.jsonに以下を加筆する。

```json
{
  "python.formatting.provider": "black",
  "python.languageServer": "Pylance"
}
```

### PyCharmを使用する場合の設定

#### フォーマッターの導入

```bash
$ pip install --user black
$ black # 起動確認
No Path provided. Nothing to do 😴
```
もしpip install中に
`WARNING: The scripts black, black-primer and blackd are installed in '/directory/to/python/version/bin' which is not on PATH.`
のようなアラート文が出てしまった場合は、下記のように環境変数のPATH(.bash_profileなど)に上記のディレクトリを追加する。

```bash
export PATH=$PATH:/hoge/hoge/:/directory/to/python/version/bin
```

```bash
$ which black
directory/to/python/version/bin/black
```
下記画像を参考にpreferences -> tools -> file watcher -> +ボタンを押して追加。

<img width="691" alt="スクリーンショット 2021-06-21 15 07 53" src="https://user-images.githubusercontent.com/47024101/122714933-1c3a0a00-d2a3-11eb-9f08-8470f4f91e3e.png">

## step1: Djangoの環境構築

### ゴール

docker composeでローカルサーバーの立ち上げ

Djangoのデフォルト画面の表示

### 手順

- ディレクトリの作成

```
.
├── docker
│   ├── python
│   └── vue
├── docker-compose.yml
├── python
├── requirements.txt
└── vue
```

- Djangoプロジェクト作成

```
cd python
docker compose run django django-admin startproject app .
```

- Dockerの設定
  - Dockerfile記述
  - docker-compose.yml記述

- ブラウザ表示

`docker compose up`

`localhost:8000`

## step2: Vuejsの環境構築

### ゴール

docker composeでローカルサーバーの立ち上げ

Vueのデフォルト画面の表示

### 手順

- Vuejsの導入

```
  cd vue
  npm install @vue/cli
  npx @vue/cli create vue
```

- Dockerの設定
  - Dockerfile記述
  - docker-compose.yml加筆

```
.
├── docker
│   ├── python
│   │   └── Dockerfile
│   └── vue
│       └── Dockerfile
├── docker-compose.yml
├── python
│   ├── app
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── db.sqlite3
│   └── manage.py
├── requirements.txt
└── vue
    ├── README.md
    ├── babel.config.js
    ├── node_modules
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   └── index.html
    ├── src
    │   ├── App.vue
    │   ├── assets
    │   │   └── logo.png
    │   ├── components
    │   │   └── HelloWorld.vue
    │   └── main.js
    └── yarn.lock
```

- コンテナ立ち上げ

```
docker compose down
docker compose build
docker compose up
```

- ブラウザ確認

`localhost:8080`

`docker compose down`

## Step3：　Djnago側にwebpack導入

### ゴール

localhost:8000にアクセスした際に`Are you sure webpack has generated the file and the path is correct?`と表示されること

### 手順

Djangoで必要なライブラリを追加する→Vue側でwebpackの設定ファイルを作成する流れ

- `python/templates/index.html`を作成する
- settingsファイルでテンプレートディレクトリを定義する。
- ルートpathで上記のテンプレートを指定する
- django-webpack-loaderの導入
- `Are you sure webpack has generated the file and the path is correct?`と表示されることを確認

*参考資料<br>
https://githubja.com/owais/django-webpack-loader

## Step4：　Vue側にwebpack導入

### ゴール

localhost:8000にアクセスした時にVueのデフォルトページが表示されること

### 手順

- vue.config.jsを作成し編集する。

```
cd vue
npm i --save-dev webpack-bundle-tracker
touch vue.config.js
```

*参考資料<br>
https://cli.vuejs.org/config/<br>
https://webpack.js.org/plugins/split-chunks-plugin/<br>
https://webpack.js.org/configuration/resolve/#resolvealias<br>
https://webpack.js.org/configuration/dev-server








