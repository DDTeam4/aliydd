#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error, print all commands.
set -e

# clean the keystore
rm -rf ./hfc-key-store

# Shut down the Docker containers for the system tests.
cd ../basic-network
docker-compose -f docker-compose.yml kill && docker-compose -f docker-compose.yml down

# remove chaincode docker images
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)

# Your system is now clean

printf "Your system is now clean\n\n"
