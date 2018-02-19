// Created by Sinisa Drpa on 02/18/18.

const config = {
   // Use `bcrypt-cli "password" 10` to generate password from command line
   // `npm install --global bcrypt-cli` to install if necessary
   password: '$2a$10$emCmKX4AJNx49/pHscJJcOr/eizJpA6Iksn/DXf74Y3ZXesj1vste',
   secret: 'DXf74Y3ZXesj1vste', // JWT secret
   expiration: 86400, // JWT expiration, default expires in 24 hours
   serverPort: 3000, // Monitor server post
   port: 7000, // mainnet 8000, testnet 7000
   // Array of addresses to monitor
   nodes: [
      "10.211.55.6",
      "10.211.55.7",
   ]
}

module.exports = config
