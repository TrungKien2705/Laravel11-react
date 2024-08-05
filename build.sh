#!/bin/bash

# Update package list and install dependencies
apt-get update
apt-get install -y libssl1.0.0

# Install Composer dependencies
composer install

# Ensure proper permissions for Laravel directories
chmod -R 755 storage
chmod -R 755 bootstrap/cache
