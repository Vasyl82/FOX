FROM python:3.8

WORKDIR /usr/src/app

COPY requirements.txt ./
COPY FOX/.env ./FOX/
RUN python -m pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# tell the port number the container should expose
EXPOSE 8000

# CMD [ "python", "manage.py", "runserver",  "0.0.0.0:8000"]
CMD [ "./start_server.sh" ]
