#!/bin/bash

# Rebuild the dist folder
#rm -rf dist/
#gulp

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[", ]//g')

echo "$PACKAGE_VERSION"
packageName="spur-admin-$PACKAGE_VERSION"

rm -rf package
mkdir package

zip -rq package/$packageName.zip ./dist/*
