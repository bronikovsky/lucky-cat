#!/bin/bash

echo "Not implemented."
exit 1

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
DEPLOYMENTS_DIR="/home/ubuntu/luckycat/deployments"
TARGET="$DEPLOYMENTS_DIR/$1"

if [[ "$1" == "" ]]; then
  echo "Usage: bash deploy.sh [environment]"
  exit 1
fi

if [[ -d "$DIR/../deployments/$1" ]]; then
  ssh ubuntu@examine.pl "mkdir -p $DEPLOYMENTS_DIR; [[ -d $TARGET ]] && cd $TARGET && docker-compose down --remove-orphans && docker system prune -f --volumes && rm -rf $TARGET"
  scp -r "deployments/$1" ubuntu@examine.pl:"/home/ubuntu/luckycat/deployments/"
  ssh ubuntu@examine.pl "cd $TARGET && aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 797364302565.dkr.ecr.eu-west-2.amazonaws.com && docker-compose up -d"
else
  echo "Environment \"$1\" not configured."
  exit 1
fi
