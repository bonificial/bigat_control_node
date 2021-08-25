const admin = require('firebase-admin');



const serviceAccount = require('./hwwk-bigat-firebase-adminsdk-1ag6o-6f530755b2.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

  db = admin.firestore();

module.exports = {
    db
}