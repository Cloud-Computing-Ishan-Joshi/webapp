#!/bin/bash

# In install Postgres and Node.js

# Install Postgres
sudo dnf install unzip -y

sudo dnf module enable postgresql:15 -y
sudo dnf install postgresql-server -y
sudo /usr/bin/postgresql-setup --initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo systemctl status postgresql

# Setup Postgres
sudo sed -i "s/ident/scram-sha-256/g" /var/lib/pgsql/data/pg_hba.conf
# uncomment listen_addresses
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = 'localhost'/g" /var/lib/pgsql/data/postgresql.conf
# uncomment port
sudo sed -i "s/#port = 5432/port = 5432/g" /var/lib/pgsql/data/postgresql.conf
sudo systemctl restart postgresql

# Create a new user and database
sudo su - postgres -c "psql -c \"CREATE DATABASE centos_db;\""
sudo su - postgres -c "psql -c \"CREATE USER centos_user WITH PASSWORD 'centos_password';\""
sudo su - postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE centos_db TO centos_user;\""
sudo su - postgres -c "psql -c \"ALTER USER centos_user WITH SUPERUSER;\""

sudo systemctl status postgresql 


# Install Node.js 18.x
sudo dnf module enable nodejs:18 -y
sudo dnf install -y nodejs

# # Setup Postgres
# sudo systemctl start postgresql
# sudo systemctl enable postgresql
# sudo systemctl status postgresql
# sudo -u postgres psql -c "CREATE USER centos_user WITH PASSWORD 'centos_password';"
# sudo -u postgres psql -c "CREATE DATABASE centos_db WITH OWNER centos_user;"
# sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE centos_db TO centos_user;"
# sudo -u postgres psql -c "ALTER USER centos_user WITH SUPERUSER;"
# sudo sed -i "s/ident/scram-sha-256/g" /etc/postgresql/15/main/pg_hba.conf
# # uncomment listen_addresses
# sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = 'localhost'/g" /etc/postgresql/15/main/postgresql.conf
# # uncomment port
# sudo sed -i "s/#port = 5432/port = 5432/g" /etc/postgresql/15/main/postgresql.conf
# sudo systemctl restart postgresql