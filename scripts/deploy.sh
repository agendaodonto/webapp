#!/usr/bin/env bash

if [[ ${TRAVIS_TEST_RESULT=0} == 1 ]]; then
  exit 1;
fi

if [[ $TRAVIS_BRANCH == "master" ]]; then
  echo "Deploying to Production"
  ng build --aot --env=prod
  dpl --provider=firebase --token=$FIREBASE_TOKEN --project=agendaodonto-29023
else
  echo "Skipping deploy to production. (Not on master branch)"
fi

if [[ $TRAVIS_BRANCH == "develop" ]]; then
  echo "Deploying to Staging"
  ng build --aot -env=staging
  dpl --provider=firebase --token=$FIREBASE_TOKEN --project=agendaodontoweb-staging
else
  echo "Skipping deploy to production. (Not on develop branch)"
fi

echo "Deploying to Staging (Force deploy just for test!)"
ng build --aot -env=staging
dpl --provider=firebase --token=$FIREBASE_TOKEN --project=agendaodontoweb-staging
