#!/bin/bash

export SLEEP=5

IS_NPM_WORKING=$(npm --version)
if [[ -z $IS_NPM_WORKING ]]; then
    echo "npm is not working :\\"
    exit 1
fi

set -e
npm install mocha -g
npm test
set +e