#!/usr/bin/env bash

if [[ ${TRAVIS_TEST_RESULT=0} == 1 ]]; then
  exit 1;
fi

if [[ $TRAVIS_BRANCH == "master" ]]; then
  echo "Deploying to Production"
  dpl --provider=firebase --token=$FIREBASE_TOKEN --project=agendaodonto-29023
fi

if [[ $TRAVIS_BRANCH == "develop" ]]; then
  echo "Deploying to Staging"
  dpl --provider=firebase --token=$FIREBASE_TOKEN --project=agendaodontoweb-staging
fi
