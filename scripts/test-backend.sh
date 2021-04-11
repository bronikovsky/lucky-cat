#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

ctrl_c() {
  printf "\nStopping all commands...\n"
  kill 0
}

trap ctrl_c EXIT

{
  docker-compose -f "$DIR/../docker-compose.dev.yml" up &
  yarn --cwd="$DIR/../packages/backend" run start:development &
  FORCE_COLOR=true yarn --cwd="$DIR/../packages/frontend" run start:development | cat
}

