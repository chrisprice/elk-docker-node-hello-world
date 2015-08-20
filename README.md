# monitoring
A simple example of a multi-node node app to demonstrate ELK. 

## Building

```
./build-all.sh
```

## Running

```
./run-all.sh
```

## Stopping

```
./stop-all.sh
```

## Starting

```
./start-all.sh
```

## Removing containers

```
./rm-all.sh
```

## Clean (everything!)

```
docker rm -f `docker ps -qa`
docker rmi -f `docker images -qa`
```

## Load script

The index.js script can be used to apply load -

```
node index.js <url> <delay> <randomisation>
```
