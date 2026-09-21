module.exports = {
  apps: [{
      name: 'ts-training',
      cwd: '/var/www/html/ts-training/backend',
      script: '/var/www/html/ts-training/backend/dist/bin/www.js',
      instances: 1,
      autorestart: true,
      watch: true,
    }
  ]
};
