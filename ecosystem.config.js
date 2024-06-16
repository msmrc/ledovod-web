module.exports = {
  apps: [{
    name: 'ledovod-web',
    script: 'server.js',
    env: {
      NODE_ENV: 'production',
      PORT: 4000,
    },
    autorestart: true,
    watch: false,
  }],
};
