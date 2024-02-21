#!/bin/bash

# In install Postgres and Node.js

# Install Postgres
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Setup Postgres
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo systemctl status postgresql
sudo -u postgres psql -c "CREATE USER centos_user WITH PASSWORD 'centos_password';"
sudo -u postgres psql -c "CREATE DATABASE centos_db WITH OWNER centos_user;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE centos_db TO centos_user;"
sudo -u postgres psql -c "ALTER USER centos_user WITH SUPERUSER;"
sudo sed -i "s/ident/scram-sha-256/g" /etc/postgresql/15/main/pg_hba.conf
# uncomment listen_addresses
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = 'localhost'/g" /etc/postgresql/15/main/postgresql.conf
# uncomment port
sudo sed -i "s/#port = 5432/port = 5432/g" /etc/postgresql/15/main/postgresql.conf
sudo systemctl restart postgresql