# syntax=docker/dockerfile:1
FROM python:3.9.5-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /app
ADD requirements.txt /app/
RUN pip install -r requirements.txt