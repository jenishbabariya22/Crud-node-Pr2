const express = require('express');

const port = 9000;


const app = express();

app.use(express.urlencoded());

app.set('view engine', 'ejs');

let record = [
    {
        task: "javascript",
        userid: 12123,
    },
    {
        task: "html,css",
        userid: 37812,
    },
    {
        task: "NODE JS",
        userid: 3712,
    },
]

app.get('/', (req, res) => {
    let transfer = {}
    return res.render('index', {
        record, transfer
    });
})

app.post('/addrecord', (req, res) => {
    let task = req.body.task;
    let id = req.body.editid;
    let userid = Math.floor(Math.random() * 1000);
    let obj = {
        task: task,
        userid: userid,
    }
    if (id) {
        let editdata = record.map((val) => {
            if (val.userid == id) {
                val.task = req.body.task;
            }
            return val
        })
        record = editdata;
        return res.redirect('/');
    } else {
        record.push(obj);
        return res.redirect('/');
    }

})

app.get('/deleterecord', (req, res) => {
    let id = req.query.deleteid;
    let del = record.filter((val) => {
        return val.userid != id
    });
    record = del;
    return res.redirect('/');
})
app.get('/editrecord', (req, res) => {
    let id = req.query.editeid;
    let edi = record.find((val) => {
        return val.userid == id
    });

    return res.render('index', {
        transfer: edi,
        record
    })
})


app.listen(port, (err) => {
    if (err) {
        console.log('server is not started');
        return false;
    }
    console.log(`server is started on port :- ${port}`);
})