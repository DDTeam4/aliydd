#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error, print all commands.
set -ev

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1

docker-compose -f docker-compose.yml down

docker-compose -f docker-compose.yml up -d

# wait for Hyperledger Fabric to start
# incase of errors when running later commands, issue export FABRIC_START_TIMEOUT=<larger number>
export FABRIC_START_TIMEOUT=10
#echo ${FABRIC_START_TIMEOUT}
sleep ${FABRIC_START_TIMEOUT}


# Create the channel
docker exec cli peer channel create -o orderer.example.com:7050 -c mychannel -f ./channel-artifacts/channel.tx

# Join peer0.org1.example.com to the channel.
docker exec cli peer channel join -b mychannel.block

# Join peer1.org1.example.com to the channel.
docker exec -e "CORE_PEER_ADDRESS=peer1.org1.example.com:7051" cli peer channel join -b mychannel.block

# Join peer2.org1.example.com to the channel.
docker exec -e "CORE_PEER_ADDRESS=peer2.org1.example.com:7051" cli peer channel join -b mychannel.block
