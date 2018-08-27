var express = require('express');
var router = express.Router();
'use strict';
/*
* Copyright IBM Corp All Rights Reserved
*
* SPDX-License-Identifier: Apache-2.0
*/
/*
 * Chaincode query
 */

router.post('/',function(req,res,next){
var name=req.query.name;

console.log("The received req is :",req.query);
console.log("The received name is :",name);

var Fabric_Client = require('fabric-client');
var path = require('path');
var util = require('util');
var os = require('os');

//
var fabric_client = new Fabric_Client();

// setup the fabric network
var channel = fabric_client.newChannel('mychannel');
var peer = fabric_client.newPeer('grpc://localhost:7051');
channel.addPeer(peer);

//
var member_user = null;
var store_path = path.join(__dirname, 'hfc-key-store');
console.log('Store path:'+store_path);
var tx_id = null;

// create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
Fabric_Client.newDefaultKeyValueStore({ path: store_path
}).then((state_store) => {
	// assign the store to the fabric client
	fabric_client.setStateStore(state_store);
	var crypto_suite = Fabric_Client.newCryptoSuite();
	// use the same location for the state store (where the users' certificate are kept)
	// and the crypto store (where the users' keys are kept)
	var crypto_store = Fabric_Client.newCryptoKeyStore({path: store_path});
	crypto_suite.setCryptoKeyStore(crypto_store);
	fabric_client.setCryptoSuite(crypto_suite);

	// get the enrolled user from persistence, this user will sign all requests
	return fabric_client.getUserContext('user1', true);
}).then((user_from_store) => {
	if (user_from_store && user_from_store.isEnrolled()) {
		console.log('Successfully loaded user1 from persistence');
		member_user = user_from_store;
	} else {
		throw new Error('Failed to get user1.... run registerUser.js');
	}

        //modified by ydd at 201808
        // queryPerson chaincode function - requires 1 argument, ex: args: ['ID'],
	// queryAllPersons chaincode function - requires no arguments , ex: args: [''],
  
	const request = {
		//targets : --- letting this default to the peers assigned to the channel
		chaincodeId: 'fabhouse',
		fcn: 'queryByOwner',
		args: [name]
	};

	// send the query proposal to the peer
	return channel.queryByChaincode(request);
}).then((query_responses) => {
	console.log("Query has completed, checking results");
	// query_responses could have more than one  results if there multiple peers were used as targets
	if (query_responses && query_responses.length == 1) {
		if (query_responses[0] instanceof Error) {
			console.error("error from query = ", query_responses[0]);
		} else {
			console.log("Response is ", query_responses[0].toString());
				var str = query_responses[0].toString();
                        if(str=="") {
                            console.log("query no result.");
                            res.status(400).json({error:"您当前没有房屋注册！"});
                        }
                        else{
                            result = JSON.parse(str);
                            var length=result.length;
                            console.log("The length of result is :",result.length);
                           /* var i;
                            for(i=0;i<length;i++){

                            }
                            */
                            console.log("The result is :",result[0].Key);  //get the result
                            console.log(result[0].Record.id+":"+result[0].Record.area+":"+result[0].Record.status+":"+result[0].Record.owner+":"+result[0].Record.user);
                           	console.log("redirect to listHouse.pug.");
                        	//res.render('listHouse',{result:result});
                        	//res.render('listHouse',{result:result[0].Record});  
                        	res.render('listOwnerHouse',{result:result,length:length});                          
                            }
                }
	} else {
		console.log("No payloads were returned from query");
	}
}).catch((err) => {
	console.error('Failed to query successfully :: ' + err);
});
});

module.exports = router;
