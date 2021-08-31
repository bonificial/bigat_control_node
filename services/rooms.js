var utils = require("../utils/firebase")
var db = utils.db
const dotenv = require('dotenv');
dotenv.config();

let loadRooms = async () => {
    const snapshot = await db.collection('rooms').get();
    let rooms = {};
      snapshot.forEach(  (doc) => {
let room_data = doc.data();
          room_data['key'] = doc.id;

          room_data['member_count'] = Object.values(room_data.members).length;
          delete room_data.chats
        rooms  = {...rooms, [doc.id+"k"]: room_data};

    })
    snapshot.forEach(  (doc) => {
        let room_data = doc.data();
        room_data['key'] = doc.id;
        room_data['member_count'] = Object.values(room_data.members).length;
        delete room_data.chats
        rooms  = {...rooms, [doc.id+"d"]: room_data};

    })
 return rooms;
}
module.exports =
    {

        loadRooms
    }