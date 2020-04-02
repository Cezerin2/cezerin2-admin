# Getting Started

- [Installation](#1-installation)
- [Run Application](#2-run-application)
- [Configuration](#3-configuration)

## 1. Installation

### Requirements

- Node.js
- MongoDB
- cezerin2 https://github.com/cezerin2/cezerin2

```shell
git clone https://github.com/cezerin2/cezerin2-admin.git cezerin2-admin
cd cezerin2-admin
npm i
npm run build
```

## 2. Run Application

Cezerin2-admin is a static single page app. PM2 will service the application at
port 3003. (not that PM2 will not support direct url paths)

1. Install PM2 globally

```
npm i -g pm2
```

2. Run PM2

```shell
pm2 start process.json
```

## 3. Configuration

Change it with environment variables

```shell
LANGUAGE=en \
API_BASE_URL=http://localhost:3001/api/v1
API_WEB_SOCKET_URL=ws://localhost:3001
DEVELOPER_MODE=true
pm2 start process.json
```
