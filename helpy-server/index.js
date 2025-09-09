const admin = require('firebase-admin')
const express = require('express')
const app = express()
const port = 3000

var serviceAccount = require("./helpy-firebase-adminsdk-pciqh-abe6fcd703.json");
app.use(express.json())
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});



app.post('/send-noti', (req, res) => {
    console.log(req.body.data.data)
    console.log(req.body.data.tokens)
    const message = {
        data:req.body.data.data,
        notification: {
            title: req.body.data.title,
            body: req.body.data.body,            
        },
        tokens: req.body.data.tokens,

    }

    admin.messaging().sendMulticast(message).then(res => {
        console.log('send success')
    }).catch(err => {
        console.log(err)
    })
})


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})

