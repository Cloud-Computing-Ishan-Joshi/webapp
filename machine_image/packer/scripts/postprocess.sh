#!/bin/bash

# Create a local new user and group named csye6225 with nologin shell /usr/sbin/nologin
sudo groupadd -r csye6225
sudo useradd -r -g csye6225 -s /usr/sbin/nologin csye6225

# Unzip the file /tmp/packer/webapp.zip to /var/webapp
sudo mkdir -p /var/webapp
sudo unzip /tmp/packer/webapp.zip -d /var/webapp

# Change the ownership of /var/webapp to csye6225:csye6225
sudo chown -R csye6225:csye6225 /var/webapp

# Create env file to /var/webapp/.env
sudo touch /var/webapp/.env
sudo echo "PORT=5432" > /var/webapp/.env
sudo echo "DB_USERNAME=centos_user" >> /var/webapp/.env
sudo echo "DB_PASSWORD=centos_password" >> /var/webapp/.env
sudo echo "DB_NAME=centos_db" >> /var/webapp/.env
sudo echo "DB_HOST=localhost" >> /var/webapp/.env
sudo echo "DB_PORT=5432" >> /var/webapp/.env

# Install the dependencies for the webapp npm
sudo npm install --prefix /var/webapp


# Use a systemd service file present in /var/webapp/machine_image/service/webapp.service to start the webapp service
sudo cp /var/webapp/machine_image/service/webapp.service /etc/systemd/system/webapp.service
sudo systemctl daemon-reload
sudo systemctl start webapp
sudo systemctl enable webapp
sudo systemctl status webapp

