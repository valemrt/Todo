#!/bin/bash

export SLEEP=10
# remove previous running container
echo "stopping all es containers..."
docker stop es
sleep ${SLEEP}
echo "deleting all es containers..."
docker rm es

# start ElasticSearch and configure
. ./scripts/elasticsearch.sh