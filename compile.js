const path = require('path');
const fs = require('fs');
const solc = require('solc')

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol')
const source = fs.readFileSync(inboxPath, 'UTF8');

var complierInput = {
    language: 'Solidity',
    sources: {
        'inbox.sol': {
            content: source
        }
    },
    settings: {
        optimizer:
        {
            enabled: true
        },
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

let output = JSON.parse(solc.compile(JSON.stringify(complierInput)));
module.exports = output
// `output` here contains the JSON output as specified in the documentation
// for (var contractName in output.contracts['inbox.sol']) {
//   console.log(
//     contractName +
//       ': ' +
//       output.contracts['inbox.sol'][contractName].evm.bytecode.object
//   );
// }