#!/bin/bash

set -x
#DOCKER_ES_IMAGE=itzg/elasticsearch:2.4.0
DOCKER_ES_IMAGE=docker.elastic.co/elasticsearch/elasticsearch:6.4.2
echo "elasticsearch.sh"

docker ps -a | grep es
if [ $? -eq 0 ];then
  echo "ElasticSearch es image found, starting it.."
  docker start es
else
  echo "Downloading and starting es"
  docker pull ${DOCKER_ES_IMAGE}
  docker run -d --name es -p 127.0.0.1:9200:9200 -e ${DOCKER_ES_IMAGE}
  #docker run -d --name es -p 9200:9200 -e "discovery.type=single-node" ${DOCKER_ES_IMAGE}
fi

echo "waiting ${SLEEP} seconds to let elasticsearch boot properly"
sleep ${SLEEP}

echo "testing eleasticsearch"
#curl localhost:9200/_cluster/health?pretty
curl http://127.0.0.1:9200/_cluster/health?pretty

echo "elasticsearch ready, creating todo index"
curl -X PUT "localhost:9200/todo"