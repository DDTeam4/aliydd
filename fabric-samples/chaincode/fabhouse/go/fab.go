/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 * The sample smart contract for documentation topic:
 * Writing Your First Blockchain Application
 */

package main

/* Imports
 * 4 utility libraries for formatting, handling bytes, reading and writing JSON, and string manipulation
 * 2 specific Hyperledger Fabric specific libraries for Smart Contracts
 */
import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Define the Smart Contract structure
type SmartContract struct {
}

// Define the person structure, with 5 properties.  Structure tags are used by encoding/json library
type Person struct {
        Idcard   string `json:"idcard"`
        Name  string `json:"name"`
	Phone  string `json:"phone"`
	Company string `json:"company"`
	Credit  string `json:"credit"`
}

// Define the House structure, with 4 properties.  Structure tags are used by encoding/json library
type House struct {
        Id  string `json:"id"`
        Area   string `json:"area"`
        Status  string `json:"status"`
	Owner  string `json:"owner"`
	User string `json:"user"`
}

/*
 * The Init method is called when the Smart Contract "fabcar" is instantiated by the blockchain network
 * Best practice is to have any Ledger initialization in separate function -- see initLedger()
 */

func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

/*
 * The Invoke method is called as a result of an application request to run the Smart Contract "fabcar"
 * The calling application program has also specified the particular smart contract function to be called, with arguments
 */
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger appropriately
	if function == "queryPerson" {
		return s.queryPerson(APIstub, args)
	} else if function == "initLedger" {
		return s.initLedger(APIstub)
	} else if function == "createPerson" {
		return s.createPerson(APIstub, args)
	} else if function == "queryAllPersons" {
		return s.queryAllPersons(APIstub)
	} else if function == "changePerson" {
		return s.changePerson(APIstub, args)
	} else if function == "queryHouse" {
		return s.queryHouse(APIstub, args)
	} else if function == "createHouse" {
		return s.createHouse(APIstub, args)
	} else if function == "queryAllHouses" {
		return s.queryAllHouses(APIstub)
	} else if function == "changeHouse" {
		return s.changeHouse(APIstub, args)
	}else if function == "queryUnrentHouses" {
		return s.queryUnrentHouses(APIstub, args)
	}else if function == "changeToRented" {
		return s.changeToRented(APIstub, args)
	}else if function == "changeToUnrent" {
		return s.changeToUnrent(APIstub, args)
	}else if function == "queryByOwner" {
		return s.queryByOwner(APIstub, args)
	}else if function == "queryByUser" {
		return s.queryByUser(APIstub, args)
	}

	return shim.Error("Invalid Smart Contract function name.")
}

func (s *SmartContract) queryPerson(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	personAsBytes, _ := APIstub.GetState(args[0])
	return shim.Success(personAsBytes)
}

func (s *SmartContract) queryHouse(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	houseAsBytes, _ := APIstub.GetState(args[0])
	return shim.Success(houseAsBytes)
}

func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

func (s *SmartContract) createPerson(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 5 {
		return shim.Error("Incorrect number of arguments. Expecting 5")
	}

	var person = Person{Idcard: args[0], Name: args[1], Phone: args[2], Company: args[3], Credit: args[4]}

	personAsBytes, _ := json.Marshal(person)
	APIstub.PutState(args[0], personAsBytes)

	return shim.Success(nil)
}

func getListResult(resultsIterator shim.StateQueryIteratorInterface) ([]byte,error){

   defer resultsIterator.Close()
   // buffer is a JSON array containing QueryRecords
   var buffer bytes.Buffer
   buffer.WriteString("[")

   bArrayMemberAlreadyWritten := false
   for resultsIterator.HasNext() {
      queryResponse, err := resultsIterator.Next()
      if err != nil {
         return nil, err
      }
      // Add a comma before array members, suppress it for the first array member
      if bArrayMemberAlreadyWritten == true {
         buffer.WriteString(",")
      }
      buffer.WriteString("{\"Key\":")
      buffer.WriteString("\"")
      buffer.WriteString(queryResponse.Key)
      buffer.WriteString("\"")

      buffer.WriteString(", \"Record\":")
      // Record is a JSON object, so we write as-is
      buffer.WriteString(string(queryResponse.Value))
      buffer.WriteString("}")
      bArrayMemberAlreadyWritten = true
   }
   buffer.WriteString("]")
   fmt.Printf("queryResult:\n%s\n", buffer.String())
   return buffer.Bytes(), nil
}


func (s *SmartContract) queryAllPersons(APIstub shim.ChaincodeStubInterface) sc.Response {
//person id is from 0000 to 0999
	startKey := "0000"
	endKey := "0999"

	resultsIterator, err := APIstub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	person,err:=getListResult(resultsIterator)

	if err!=nil{
	      return shim.Error("getListResult failed")
	}
	return shim.Success(person)
}

func (s *SmartContract) changePerson(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 5 {
		return shim.Error("Incorrect number of arguments. Expecting 5")
	}

	personAsBytes, _ := APIstub.GetState(args[0])
	person := Person{}

	json.Unmarshal(personAsBytes, &person)

        person.Idcard = args[0]
        person.Name = args[1]
        person.Phone = args[2]
	person.Company = args[3]
	person.Credit = args[4]

	personAsBytes, _ = json.Marshal(person)
	APIstub.PutState(args[0], personAsBytes)

	return shim.Success(nil)
}

func (s *SmartContract) createHouse(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 5 {
		return shim.Error("Incorrect number of arguments. Expecting 5")
	}

	var house = House{Id: args[0], Area: args[1], Status: args[2], Owner: args[3], User: args[4] }

	houseAsBytes, _ := json.Marshal(house)
	APIstub.PutState(args[0], houseAsBytes)

	return shim.Success(nil)
}

func (s *SmartContract) queryAllHouses(APIstub shim.ChaincodeStubInterface) sc.Response {
//houses id are from 1000 to 1999
	startKey := "1000"
	endKey := "1999"

	resultsIterator, err := APIstub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	houses,err:=getListResult(resultsIterator)
	if err!=nil{
	      return shim.Error("getListResult failed")
	}
	return shim.Success(houses)
}



func (s *SmartContract) queryUnrentHouses(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	status := args[0]
	
	queryString := fmt.Sprintf("{\"selector\":{\"status\":\"%s\"}}", status)
	
	resultsIterator, err := APIstub.GetQueryResult(queryString)
 	if err!=nil{
    	 return shim.Error("Rich query failed 1")
   	}

  	houses,err:=getListResult(resultsIterator)
   	if err!=nil{
      		return shim.Error("Rich query failed 2")
   	}
   	return shim.Success(houses)

}


func (s *SmartContract) queryByOwner(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	name := args[0]
	
	queryString := fmt.Sprintf("{\"selector\":{\"owner\":\"%s\"}}", name)
	
	resultsIterator, err := APIstub.GetQueryResult(queryString)
 	if err!=nil{
    	 return shim.Error("Rich query failed 1")
   	}

  	houses,err:=getListResult(resultsIterator)
   	if err!=nil{
      		return shim.Error("Rich query failed 2")
   	}
   	return shim.Success(houses)

}

func (s *SmartContract) queryByUser(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	name := args[0]
	
	queryString := fmt.Sprintf("{\"selector\":{\"user\":\"%s\"}}", name)
	
	resultsIterator, err := APIstub.GetQueryResult(queryString)
 	if err!=nil{
    	 return shim.Error("Rich query failed 1")
   	}

  	houses,err:=getListResult(resultsIterator)
   	if err!=nil{
      		return shim.Error("Rich query failed 2")
   	}
   	return shim.Success(houses)

}

func (s *SmartContract) changeHouse(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 5 {
		return shim.Error("Incorrect number of arguments. Expecting 5")
	}

	houseAsBytes, _ := APIstub.GetState(args[0])
	house := House{}

	json.Unmarshal(houseAsBytes, &house)

        house.Id = args[0]
        house.Area = args[1]
        house.Status = args[2]
	house.Owner = args[3]
	house.User = args[4]

	houseAsBytes, _ = json.Marshal(house)
	APIstub.PutState(args[0], houseAsBytes)

	return shim.Success(nil)
}

func (s *SmartContract) changeToRented(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	houseAsBytes, _ := APIstub.GetState(args[0])
	house := House{}

	json.Unmarshal(houseAsBytes, &house)

        house.Status = args[1]

	houseAsBytes, _ = json.Marshal(house)
	APIstub.PutState(args[0], houseAsBytes)

	return shim.Success(nil)
}

func (s *SmartContract) changeToUnrent(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	houseAsBytes, _ := APIstub.GetState(args[0])
	house := House{}

	json.Unmarshal(houseAsBytes, &house)

        house.Status = args[1]
        house.User = house.Owner

	houseAsBytes, _ = json.Marshal(house)
	APIstub.PutState(args[0], houseAsBytes)

	return shim.Success(nil)
}

// The main function is only relevant in unit test mode. Only included here for completeness.
func main() {

	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
