#!/bin/bash

# Custom PHP runtime setup
apt-get update
apt-get install -y libssl1.0.0

# Start PHP
php-fpm
