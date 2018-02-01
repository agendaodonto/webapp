#!/usr/bin/env bash

if [[ ${TRAVIS_TEST_RESULT=0} == 1 ]]; then
  exit 1;
fi

if [[ $TRAVIS_BRANCH == "master" ]]; then
  echo "Deploying to Production"
  ng build --env=prod --prod
  firebase use --token $FIREBASE_TOKEN agendaodonto-29023
  firebase deploy --non-interactive --token $FIREBASE_TOKEN
else
  echo "Skipping deploy to production. (Not a tag)"
fi

if [[ $TRAVIS_BRANCH == "develop" ]]; then
  echo "Deploying to Staging"
  ng build -env=staging --prod
  firebase use --token $FIREBASE_TOKEN agendaodontoweb-staging
  firebase deploy --non-interactive --token $FIREBASE_TOKEN
else
  echo "Skipping deploy to staging. (Not on develop branch)"
fi

