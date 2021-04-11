#!/bin/bash

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
SEMVER_RESULT=$(PATH=$PATH:"$DIR/../node_modules/.bin" semver "$1")

if [[ "$SEMVER_RESULT" != "$1" ]]; then
  echo "Invalid version provided: '$1'"
  exit 1
fi

ECR_URL=797364302565.dkr.ecr.eu-west-2.amazonaws.com

aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin ${ECR_URL}

docker build -f "$DIR/../Dockerfile" --iidfile "/tmp/luckycat-docker-iid" "$DIR/.."

IMAGE_ID="$(cat /tmp/examine-docker-iid)"

function push_tag {
  TAG="$ECR_URL/luckycat-frontend:$1"

  docker tag "$IMAGE_ID" "$TAG"
  docker push "$TAG"
}

push_tag "$1"
push_tag "latest"
