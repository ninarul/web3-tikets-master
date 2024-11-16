import Web3 from 'web3';
import configuration from '../build/contracts/Tickets.json';
import 'bootstrap/dist/css/bootstrap.css';
import ticketImage from './images/ticket.png';

// Membuat elemen dari string HTML
const createElementFromString = (string) => {
  const el = document.createElement('div');
  el.innerHTML = string;
  return el.firstChild;
};

// Konfigurasi alamat kontrak dan ABI
const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(window.ethereum || 'http://127.0.0.1:7545');
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

let account;

// Elemen yang akan digunakan di DOM
const accountEl = document.getElementById('account');
const ticketsEl = document.getElementById('tickets');
const TOTAL_TICKETS = 10;
const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';

// Fungsi untuk membeli tiket
const buyTicket = async (ticket) => {
  try {
    await contract.methods
      .buyTicket(ticket.id)
      .send({ from: account, value: ticket.price });
  } catch (error) {
    console.error("Error membeli tiket:", error);
    alert("Gagal membeli tiket. Coba lagi!");
  }
};

// Fungsi untuk memuat dan menampilkan tiket
const refreshTickets = async () => {
  ticketsEl.innerHTML = ''; // Kosongkan kontainer tiket

  for (let i = 0; i < TOTAL_TICKETS; i++) {
    try {
      const ticket = await contract.methods.tickets(i).call();
      ticket.id = i;

      if (ticket.owner === EMPTY_ADDRESS) {
        const priceInEth = web3.utils.fromWei(ticket.price, 'ether');

        const ticketEl = createElementFromString(
          `<div class="ticket card" style="width: 18rem;">
            <img src="${ticketImage}" class="card-img-top" alt="Ticket Image">
            <div class="card-body">
              <p class="card-text">${priceInEth} ETH</p>
              <button class="btn btn-primary">Buy</button>
            </div>
          </div>`
        );

        const ticketButton = ticketEl.querySelector('.btn');
        ticketButton.addEventListener('click', async () => {
          await buyTicket(ticket);
        });

        ticketsEl.appendChild(ticketEl);
      }
    } catch (error) {
      console.error('Error fetching ticket:', error);
    }
  }
};

const main = async () => {
    try {
      
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        account = accounts[0];
        accountEl.innerText = account;
  
        
        await refreshTickets();
      } else {
        alert("MetaMask tidak ditemukan. Pastikan MetaMask terpasang di browser Anda.");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      alert("Gagal menghubungkan ke MetaMask. Pastikan MetaMask terinstal dan aktif.");
    }
  };

main();
