/* eslint-disable indent */
module.exports = {
  apps: [
    {
      name: 'twitter-dev-service',
      instance: 1,
      exec_mode: 'cluster',
      watch: true,
      script: './index.js',
      ignore_watch: ['node_modules', '.git'],
      env: {
        'NODE_ENV': 'development'
      }
    },
    {
      name: 'twitter-service',
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      script: './index.js',
      ignore_watch: ['node_modules', '.git'],
      env: {
        'NODE_ENV': 'production'
      },
    }]
};