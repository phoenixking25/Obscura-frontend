const dev = {
  api: {
    url: 'http://localhost:8000',
  },
  cypher: {
    algo: 'aes256',
    passKey: '394rwe78fudhwqpwriufdhr8ehyqr9pe8fud',
    encoding: 'hex',
  },
  startTimestamp: 1538188200000,
  startDate: '12/29/2019 08:00 AM',
};

const prod = {
  api: {
    url: '/api',
  },
  cypher: {
    algo: 'aes256',
    passKey: '394rwe78fudhwqpwriufdhr8ehyqr9pe8fud',
    encoding: 'hex',
  },
  startTimestamp: 1538188200000,
  startDate: '09/29/2018 08:00 AM',
};

const config = process.env.REACT_APP_STAGE === 'production' ? prod : dev;
export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
