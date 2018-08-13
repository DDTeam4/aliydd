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

#shot down the first-network
cd ../first-network
./byfn.sh down

# remove chaincode docker images
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)

#press "y" when prompted by the command
docker network prune
docker rmi dev-peer0.org1.example.com-fabcar-1.0-5c906e402ed29f20260ae42283216aa75549c571e2e380f3615826365d8269ba
# Your system is now clean

printf "Your system is now clean\n\n"
