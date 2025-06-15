const cron = require('node-cron');
const notifyAndDeleteExpiredRoles = require('./helpers/checkAndNotifyExpired');

cron.schedule('0 0 * * *', () => {
  console.log('Check for expired viewers!');  
  notifyAndDeleteExpiredRoles();
});
