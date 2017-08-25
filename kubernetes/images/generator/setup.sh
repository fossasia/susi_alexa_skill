#!/bin/bash
git clone ${REPOSITORY} susi_alexa_skill
cd susi_alexa_skill
git checkout ${BRANCH}

if [ -v COMMIT_HASH ]; then
    git reset --hard ${COMMIT_HASH}
fi

rm -rf .git
npm install --no-shrinkwrap
