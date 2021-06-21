# syntax=docker/dockerfile:1
FROM python:3.9.5-slim
ENV PYTHONUNBUFFERED=1

ENV HOME=/usr/src/app/

WORKDIR $HOME

COPY python/requirements.txt $HOME
RUN pip install -r requirements.txt
