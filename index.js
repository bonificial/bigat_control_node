var Express = require('express');
const mbs = require('./services/members')
const rooms = require('./services/rooms')
const app = Express();
const port = process.env.PORT || 5000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/dashboard/members', async (req, res) => {
let members = await mbs.membersStats();
    res.json(members)
})
app.get('/members/list', async (req, res) => {
    let members = await mbs.membersList();
   // console.log(members)
    res.json(members)
})
app.get('/rooms/list', async (req, res) => {
    let roomsList = await rooms.loadRooms();

    res.json(roomsList)
})

app.get('/user/:key', async (req, res) => {

let userInfo = await mbs.memberInfo(req.params.key)
res.json(userInfo)
})
app.listen(port, () => {
    console.log('Listening on port ', port)
})