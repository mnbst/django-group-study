# syntax=docker/dockerfile:1
FROM node:16-buster-slim

RUN apt update && apt install -y nodejs npm

WORKDIR /usr/src/app/
COPY ./vue/ .
