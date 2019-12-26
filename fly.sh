#!/bin/bash
#启动是传入prod或者dev
echo "the app start enviroment is $1"
pm2 start ./ecosystem.config.js --env $1
