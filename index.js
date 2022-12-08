const cron = require('node-cron');
const {MongoClient} = require('mongodb');

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

cron.schedule(scheduleStr, async () => {

  console.log("...Initiating Cron...");
  await sendNotification();

});

async function sendNotification() {
  let secretaries = await getAllSecretaries();
  console.log(secretaries);
}

async function getAllSecretaries() {
  const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;

    const client = new MongoClient(uri);
 
    try {
        await client.connect();
 
        return await client
                        .db("waqfenau")
                        .collection('secretaries')
                        .find({})
                        .toArray(); 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}