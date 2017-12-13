#!/usr/bin/env bash

if [[ ${TRAVIS_TEST_RESULT=0} == 1 ]]; then
  exit 1;
fi

if [[ $TRAVIS_BRANCH == "master" ]]; then
  echo "Deploying to Production"
  ng build --aot --env=prod
  firebase use --token $FIREBASE_TOKEN agendaodonto-29023
  firebase deploy --non-interactive --token $FIREBASE_TOKEN
else
  echo "Skipping deploy to production. (Not on master branch)"
fi

if [[ ! -z $TRAVIS_TAG ]]; then
  echo "Deploying to Staging"
  ng build --aot -env=staging
  firebase use --token $FIREBASE_TOKEN agendaodontoweb-staging
  firebase deploy --non-interactive --token $FIREBASE_TOKEN
else
  echo "Skipping deploy to production. (Not a tag)"
fi

