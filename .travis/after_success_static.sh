#!/usr/bin/env bash

echo "STATICS"
cd "$TRAVIS_BUILD_DIR"

rm -rf .static
mkdir .static
mkdir .static/cmf
mkdir .static/components
mkdir .static/containers
mkdir .static/forms
mkdir .static/icons
mkdir .static/logging
mkdir .static/theme
cp .surge/index.html .static
echo "✓ Initialized .static"

find .static/

cd "$TRAVIS_BUILD_DIR"
