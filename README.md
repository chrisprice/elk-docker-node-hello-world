# monitoring
A simple example of a multi-node node app to demonstrate ELK.

```
node index.js <url> <delay> <randomisation>
```

```
docker build -t "chrisprice/monitoring-node-datastore" .

docker run -it --name datastore --rm "chrisprice/monitoring-node-datastore"

docker build -t "chrisprice/monitoring-node-service" .

docker run -it --name service --link datastore:datastore  --publish 80:8080 --rm "chrisprice/monitoring-node-service"
```