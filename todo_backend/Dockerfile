FROM python:3.12-alpine

RUN apk update && apk add --no-cache \
    gcc \
    musl-dev \
    mariadb-connector-c-dev \
    python3-dev \
    libffi-dev \
    pkgconfig

WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt /app/requirements.txt

RUN pip install --upgrade pip
RUN pip install -U setuptools
RUN pip install -r requirements.txt --no-cache-dir

COPY . /app/

EXPOSE 8000