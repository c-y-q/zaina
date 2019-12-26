#!/bin/bash $1 启动是传入prod或者dev
pm2 start ./ecosystem.config.js --env dev
