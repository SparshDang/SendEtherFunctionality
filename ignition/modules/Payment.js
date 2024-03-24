const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Payment", (m) => {

  const payment = m.contract("Payment");
  return { payment };
});
