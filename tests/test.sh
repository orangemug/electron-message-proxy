#!/usr/bin/env bash
set -e

dir="$(dirname "$0")"

cd $dir
mkdir -p dist
../node_modules/.bin/browserify renderer.js > dist/renderer.js
../node_modules/.bin/electron main.js
rm dist/renderer.js
rmdir dist

>&2 echo "OK"
