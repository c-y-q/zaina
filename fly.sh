#!/bin/bash
#启动是传入prod或者dev
str=""
if test -z $1; then
    str="dev"
else
    str=$1
fi
echo "the app start enviroment is $str"
pm2 start ./ecosystem.config.js --env $str
