const cron = require('node-cron');
const {MongoClient} = require('mongodb');

require('dotenv').config()

const schedule = {
    seconds:     "*", // 0-59 | *
    minutes:     "0", // 0-59 | *
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
  console.log(timestamp(), "Secteries data received from Database");
  sendMessage(secretaries);
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

function sendMessage(userArray) {

  const accountSid = process.env.TWILIO_ACCOUNT_SID // Your Account SID from www.twilio.com/console
  const authToken = process.env.TWILIO_AUTH_TOKEN // Your Auth Token from www.twilio.com/console

  const twilio = require("twilio")
  const client = new twilio(accountSid, authToken)

  userArray.forEach((element) => {

    let name = element.name;
    let phone = sanitizeNumber(element.phone);
    //let jammat = element.jammat;



  });

}

function sanitizeNumber(number) {
    let filtered = number.match(/\d+/g).join("") //extract only numbers
    if (filtered.length == 10) {
      // phone number is in the form: 3601231234
      //  add +1 to the number
      filtered = "+1" + filtered
    } else if (filtered.length == 11) {
      // phone number is in the form: 13601231234
      // add + to the number
      filtered = "+" + filtered
    } else {
      // bad phone number, do not include
      filtered = ""
    }
    return filtered;
}

function timestamp() {
  return "[" + new Date().toLocaleString() + "]";
}
