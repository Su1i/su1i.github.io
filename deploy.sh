#!/usr/bin/env sh
# 确保脚本抛出遇到的错误
set -e
npm run docs:build
# 进入生成的文件夹
cd ./dist
git init
git add -A
git commit -m "小修改"
git push -f 'https://github.com/Su1i/su1i.github.io.git' master
cd -
rm -rf ./dist