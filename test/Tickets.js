const Tickets = artifacts.require("Tickets");

contract("Tickets", (accounts) => {
  let ticketsInstance;

  // Hook untuk mendapatkan instance kontrak sebelum pengujian
  before(async () => {
    ticketsInstance = await Tickets.deployed();
  });

  it("should deploy the contract successfully", async () => {
    assert.ok(ticketsInstance.address, "Contract was not deployed successfully");
  });

  it("should have an initial value set correctly", async () => {
    const initialValue = await ticketsInstance.initialValue(); // Pastikan sesuai dengan getter di kontrak
    assert.equal(initialValue.toString(), "100", "Initial value does not match");
  });

  it("should allow users to purchase tickets", async () => {
    const ticketPrice = web3.utils.toWei("1", "ether"); // Konversi ke Wei
    await ticketsInstance.buyTicket({ from: accounts[0], value: ticketPrice }); // Pastikan 'value' sesuai
    const userTickets = await ticketsInstance.getUserTickets(accounts[0]); // Sesuaikan fungsi ini dengan kontrak Anda
    assert.equal(
        userTickets.toString(), 
        "1", 
        "Ticket purchase failed");
  });
});  