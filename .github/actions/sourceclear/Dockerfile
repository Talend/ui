FROM node:16-alpine
RUN apk add --no-cache jq
RUN apk --no-cache add curl
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
