#!/bin/bash
set -e

# Source the .env file
source /usr/webapp/.env

# Export environment variables
export DB_HOST=$DB_HOST
export DB_USER=$DB_USER
export DB_PASSWORD=$DB_PASSWORD
export DB_NAME=$DB_NAME
export DB_PORT=$DB_PORT
export PORT=$PORT
export NODE_ENV=$NODE_ENV
