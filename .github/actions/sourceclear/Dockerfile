FROM node:16
RUN apt-get install -y --no-install-recommends curl jq
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
