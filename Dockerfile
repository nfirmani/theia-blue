
FROM node:16.14.2-buster
RUN apt-get update && apt-get install -y libxkbfile-dev libsecret-1-dev python3