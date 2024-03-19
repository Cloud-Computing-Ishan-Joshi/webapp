#!/bin/bash

set -e


# Create a local new user and group named csye6225 with nologin shell /usr/sbin/nologin
sudo groupadd -r csye6225
sudo useradd -r -g csye6225 -s /usr/sbin/nologin csye6225

# Unzip the file /tmp/packer/webapp.zip to /var/webapp
# See the webapp.zip folder in /tmp/packer/webapp.zip using echo
sudo mkdir -p /usr/webapp
# echo $(ls -la /tmp/)
sudo unzip /tmp/webapp.zip -d /usr/webapp
sudo chmod 755 /usr/webapp
# sudo chmod 755 /var/webapp/.env
# echo $(ls -la /var/webapp/webapp)

# Change the ownership of /var/webapp to csye6225:csye6225
sudo chown -R csye6225:csye6225 /usr/webapp

# Create folder for logs
sudo mkdir -p /var/log/webapp
sudo chown -R csye6225:csye6225 /var/log/webapp

# Install the dependencies for the webapp npm
sudo npm install --prefix /usr/webapp/


# Use a systemd service file present in /var/webapp/machine_image/service/webapp.service to start the webapp service
sudo cp /usr/webapp/machine_image/service/webapp.service /etc/systemd/system/webapp.service
sudo systemctl daemon-reload
sudo systemctl start webapp
sudo systemctl enable webapp
sudo systemctl status webapp
sudo journalctl -xe

