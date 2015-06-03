FROM logstash:latest
COPY logstash.conf /logstash.conf
ENTRYPOINT logstash -f /logstash.conf --verbose --debug