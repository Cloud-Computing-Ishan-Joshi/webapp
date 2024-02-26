#!/bin/bash

set -e


# Create a local new user and group named csye6225 with nologin shell /usr/sbin/nologin
sudo groupadd -r csye6225
sudo useradd -r -g csye6225 -s /usr/sbin/nologin csye6225

# Unzip the file /tmp/packer/webapp.zip to /var/webapp
# See the webapp.zip folder in /tmp/packer/webapp.zip using echo
sudo mkdir -p /var/webapp
# echo $(ls -la /tmp/)
sudo unzip /tmp/webapp.zip -d /var/webapp
sudo chmod 755 /var/webapp
sudo chmod 755 /var/webapp/.env
# echo $(ls -la /var/webapp/webapp)

# Change the ownership of /var/webapp to csye6225:csye6225
sudo chown -R csye6225:csye6225 /var/webapp

# Source the environment variables from /var/webapp/.env
source /var/webapp/.env

# Export environment variables
export DB_HOST=$DB_HOST
export DB_USER=$DB_USER
export DB_PASSWORD=$DB_PASSWORD
export DB_NAME=$DB_NAME
export DB_PORT=$DB_PORT
export PORT=$PORT
export NODE_ENV=$NODE_ENV

# Create a new user and database
sudo su - postgres -c "psql -c \"CREATE DATABASE ${DB_NAME};\""
sudo su - postgres -c "psql -c \"CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASSWORD}';\""
sudo su - postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE centos_db TO ${DB_USER};\""
sudo su - postgres -c "psql -c \"ALTER USER ${DB_USER} WITH SUPERUSER;\""


# Export environment variables
# sudo echo "PORT=5432" | sudo tee -a /var/webapp/webapp/.env
# sudo echo "DB_USER=centos_user" | sudo tee -a /var/webapp/webapp/.env
# sudo echo "DB_PASSWORD=centos_password" | sudo tee -a /var/webapp/webapp/.env
# sudo echo "DB_NAME=centos_db" | sudo tee -a /var/webapp/webapp/.env
# sudo echo "DB_HOST=localhost" | sudo tee -a /var/webapp/webapp/.env
# sudo echo "DB_PORT=5432" | sudo tee -a /var/webapp/webapp/.env

# sudo chown csye6225:csye6225 /var/webapp/webapp/.env

# Install the dependencies for the webapp npm
sudo npm install --prefix /var/webapp/


# Use a systemd service file present in /var/webapp/machine_image/service/webapp.service to start the webapp service
sudo cp /var/webapp/machine_image/service/webapp.service /etc/systemd/system/webapp.service
sudo systemctl daemon-reload
sudo systemctl start webapp
sudo systemctl enable webapp
sudo systemctl status webapp
sudo journalctl -xe

