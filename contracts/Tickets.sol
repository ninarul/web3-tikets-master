pragma solidity ^0.8.0;

uint256 constant TOTAL_TICKETS = 10;

contract Tickets {
    address public owner = msg.sender;

    struct Ticket {
        uint256 id;
        uint256 price;
        address owner;
    }

    Ticket[TOTAL_TICKETS] public tickets;

    constructor() {
        for (uint256 i = 0; i < TOTAL_TICKETS; i++) {
            tickets[i].price = 1e17; // 0.1 ETH
            tickets[i].owner = address(0);  // Set owner to address(0) initially
        }
    }

    function buyTicket(uint256 _index) external payable {
        require(_index < TOTAL_TICKETS, "Invalid ticket index");
        require(tickets[_index].owner == address(0), "Ticket already owned");
        require(msg.value >= tickets[_index].price, "Not enough Ether sent");

        tickets[_index].owner = msg.sender;  // Set the ticket owner to the sender
    }
}
