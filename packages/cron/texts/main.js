const {MongoClient} = require('mongodb');

exports.main = async () => {
    console.log("...Initiating Cron...");
    await sendNotification();
    return {"body": "Done!"}
}


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