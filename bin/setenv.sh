#!/bin/bash -x

export PROJECT_NAME='Recruitments'
export PROJECT_ROOT=`pwd | sed "s/${PROJECT_NAME}.*/${PROJECT_NAME}/g"`

# Alias
alias jsdoc="${PROJECT_ROOT}/node_modules/jsdoc/jsdoc.js"

# Path
export PATH=${PROJECT_ROOT}/bin:${PATH}
