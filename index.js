const cron = require('node-cron');

require('dotenv').config()

const schedule = {
    seconds:     "*", // 0-59 | *
    minutes:     "*", // 0-59 | *
    hours:       "*", // 0-23 | *
    dayOfMonth:  "*", // 1-31 | *
    month:       "*", // 1-12 | January,September... | Jan,Sep | *
    dayOfWeek:   "*", // 0-6  | 
}

const scheduleStr = Object.values(schedule).join(" ");

cron.schedule(scheduleStr, () => {
  console.log(`Printing Local var ${process.env.TEST}`);
});