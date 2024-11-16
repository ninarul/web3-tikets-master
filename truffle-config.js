module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Host Ganache GUI
      port: 7545,        // Port Ganache GUI
      network_id: "*",   // Semua network ID
    },
  },
  
  compilers: {
    solc: {
      version: "0.8.0",      // Gunakan compiler Solidity sesuai kebutuhan
    },
  },
};
