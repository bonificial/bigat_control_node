var Express = require('express');
var mbs_service = require('./services/members')

const app = Express();
const port = 5000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/dashboard/members', async (req, res) => {
let members = await mbs_service.membersStats;
    res.json(members)
})

app.get('/user/:key', async (req, res) => {
    console.log('Req for key: ', req.params)

})
app.listen(port, () => {
    console.log('Listening on port ', port)
})