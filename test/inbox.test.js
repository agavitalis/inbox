const assert = require('assert')
const ganache = require('ganache-cli');
const { describe, it, beforeEach } = require('mocha');
const Web3 = require('web3')
const web3 = new Web3(ganache.provider() || "ws://localhost:8545");
const { contracts } = require("../compile")

let fetchedAccounts;
let inbox

beforeEach(async () => {
    
    //get a list of all the accounts
    fetchedAccounts = await web3.eth.getAccounts()
    //contracts['inbox.sol'].Inbox.evm.bytecode.object
    inbox = await new web3.eth.Contract(contracts['inbox.sol'].Inbox.abi)
        .deploy({
            data: contracts['inbox.sol'].Inbox.evm.bytecode.object, arguments: ['Hi there!']
        })
        .send({
            from: fetchedAccounts[0], gas: "1000000"
        })
})

describe("Inbox", () => {
    it("It deployes a contract", () => {
        assert.ok(inbox.options.address)
    })

    it("It has a default message", async () => {
        const message = await inbox.methods.message().call()
        assert.equal(message, 'Hi there!')
    })

    it("It can change the message", async () => {
        await inbox.methods.setMessage("Welcome Ogbonna Vitalis").send({from: fetchedAccounts[0]})
        const message = await inbox.methods.message().call()
        assert.equal(message, 'Welcome Ogbonna Vitalis')
    })

})


// class Car {
//     park() {
//         return "stopped"
//     }

//     drive() {
//         return "vroom"
//     }
// }

// let car;

// beforeEach(()=>{
//     car = new Car();
// })

// describe("Test the Car", () => {
//     it("it can park", () => {
//         assert.equal(car.park(), 'stopped')
//     })

//     it("it can drive", () => {
//         assert.equal(car.drive(), 'vroom')
//     })
// })