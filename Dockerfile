##########################################
## build frontend
##########################################
FROM node:12-buster as front_build
WORKDIR /usr/src/app
COPY ./front/package.json .
# RUN npm install npm@7.0.5
RUN npm install
COPY ./front/. .
RUN npm run build


##########################################
## django app
##########################################
FROM python:3.8

WORKDIR /usr/src/app

COPY requirements.txt ./
COPY FOX/.env ./FOX/
RUN python -m pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
COPY --from=front_build /usr/src/app/static/front ./front/static/front

# tell the port number the container should expose
EXPOSE 8000

# CMD [ "python", "manage.py", "runserver",  "0.0.0.0:8000"]
CMD [ "./start_server.sh" ]
