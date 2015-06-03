docker run -d --name elasticsearch elasticsearch:latest

docker run -d --name kibana --link elasticsearch:elasticsearch --publish 5601:5601 digitalwonderland/kibana:latest

docker run -d --name datastore --volume /var/log chrisprice/monitoring-node-datastore

docker run -d --name logstash-datastore --link elasticsearch:elasticsearch --volumes-from datastore chrisprice/monitoring-logstash-datastore

docker run -d --name service --volume /var/log --publish 80:8080 --link datastore:datastore chrisprice/monitoring-node-service

docker run -d --name logstash-service --link elasticsearch:elasticsearch --volumes-from service chrisprice/monitoring-logstash-service