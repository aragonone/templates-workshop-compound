const utils = require('./utils')(web3, artifacts)
const ERC20 = artifacts.require('DAI')

async function main() {
  const [ctoken, account, amount] = utils.processArgs()
  const address = await utils.getAddressForAccount(account)
  const token = await utils.getTokenContract(ctoken)
  const amountToBorrow = utils.getAmountInSmallestDenomination(amount)

  // Redeem tokens.
  console.log(`\nBorrowing...`)
  const tx = await token.borrow(amountToBorrow, { from: address })
  console.log(`tx`, JSON.stringify(tx, null, 2))
}

// Required by `truffle exec`.
module.exports = function(callback) {
  main()
    .then(() => callback())
    .catch(err => {
      console.log(`Error:`, err)
      callback(err)
    })
}
