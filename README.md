# 勉強会

## 準備

### ①npmの導入

```shell
(/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)")
brew update
brew install node
(brew upgrade node)
# 以下を確認
node -v                                                                                                                                  
v12.14.1
npm -v
6.14.8
```

### ②vscodeを使用する場合の設定

2. 必要なプラグイン → Django/Django Template/Python/Pylance/Beautify/Vetur
5. インタープリタでPython3最新を選び、フォーマッタにblackを選択する。
3. settings.jsonに以下を加筆する。

```json
{
  "python.formatting.provider": "black",
  "python.languageServer": "Pylance"
}
```

### ③PyCharmを使用する場合の設定

#### black(フォーマッター)の導入

```shell
pip install --user black
black # 起動確認
No Path provided. Nothing to do 😴
```
もしpip install中に
`WARNING: The scripts black, black-primer and blackd are installed in '/directory/to/python/version/bin' which is not on PATH.`
のようなアラート文が出てしまった場合は、環境変数のPATH(.bash_profileなど)に上記のディレクトリを追加する。

```shell
export PATH=$PATH:/hoge/hoge/:/directory/to/python/version/bin
```

```shell
which black
directory/to/python/version/bin/black
```
下記画像を参考にpreferences -> tools -> file watcher -> +ボタンを押して追加。

<img width="691" alt="スクリーンショット 2021-06-21 15 07 53" src="https://user-images.githubusercontent.com/47024101/122714933-1c3a0a00-d2a3-11eb-9f08-8470f4f91e3e.png">

### ④プロジェクトフォルダ作成

適当な場所で`mkdir project`

## step1: Djangoの環境構築

### ゴール

docker composeでローカルサーバーの立ち上げ

Djangoのデフォルト画面の表示

### 手順

- ディレクトリの作成

```shell
.
├── docker
│   ├── python
│   └── vue
├── docker-compose.yml
├── python
├── requirements.txt
└── vue
```

- Dockerの設定
  - Dockerfile記述
  - docker-compose.yml記述
  
- Djangoプロジェクト作成

```shell
cd python
docker compose run django django-admin startproject app .
```

- ブラウザ表示

`docker compose up`

`localhost:8000`

## step2: Vuejsの環境構築

### ゴール

docker composeでローカルサーバーの立ち上げ

Vueのデフォルト画面の表示

### 手順

- Vuejsの導入

```shell
cd vue
npm install -D @vue/cli
npx @vue/cli create vue
```

- Dockerの設定
  - Dockerfile記述
  - docker-compose.yml加筆

```shell
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

```shell
docker compose down
docker compose build
docker compose up
```

- ブラウザ確認

`localhost:8080`

`docker compose down`

#### prettier(フォーマッター)の導入

```shell
npm i -D prettier
```
- pluginからprettierを検索してインストールする
- 言語＆フレームワーク -> javascript -> prettierで以下のように設定する。

<img width="980" alt="スクリーンショット 2021-06-21 15 17 34" src="https://user-images.githubusercontent.com/47024101/122716226-f4e43c80-d2a4-11eb-8ea2-d0a396acfbf5.png">

## Step3：　Djnago側にwebpack導入

### ゴール

localhost:8000にアクセスした際に`Are you sure webpack has generated the file and the path is correct?`と表示されること

### 手順

Djangoで必要なライブラリを追加する→Vue側でwebpackの設定ファイルを作成する流れ

- `python/templates/index.html`を作成する
- settingsファイルでテンプレートディレクトリを定義する。
- urls.pyで上記のテンプレートを指定する
- django-webpack-loaderの導入
- `Are you sure webpack has generated the file and the path is correct?`と表示されることを確認

*参考資料<br>
https://githubja.com/owais/django-webpack-loader

## Step4：　Vue側にwebpack導入

### ゴール

localhost:8000にアクセスした時にVueのデフォルトページが表示されること

### 手順

- vue.config.jsを作成し編集する。

```shell
cd vue
npm i -D webpack-bundle-tracker
touch vue.config.js
```

*参考資料<br>
https://cli.vuejs.org/config/<br>
https://webpack.js.org/plugins/split-chunks-plugin/<br>
https://webpack.js.org/configuration/resolve/#resolvealias<br>
https://webpack.js.org/configuration/dev-server








