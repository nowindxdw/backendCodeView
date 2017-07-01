#!/usr/bin/env bash

${PROJECT_ROOT}/node_modules/jsdoc/jsdoc.js -r -c config/jsdoc.json -t ./node_modules/ink-docstrap/template -d ${PROJECT_ROOT}/docs -R ${PROJECT_ROOT}/README.md

${PROJECT_ROOT}/bin/viewdocs.sh
