#!/bin/bash

OS=`uname -s`

DOCINDEX=${PROJECT_ROOT}/docs/index.html

if [ "${OS}" = "Darwin" ]
then 
    open ${DOCINDEX}
elif [ "${OS}"="Linux" ]
then
    xdg-open ${DOCINDEX}
fi
