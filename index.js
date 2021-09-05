const express = require('express');
const mysql = require('mysql');
const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'kakaotalk1!',
    database: 'opentutorials'
  }
);

const cors = require('cors');
const domains = ['http://localhost:4200'];
var bodyParser = require('body-parser')

const corsOptions = {
  origin: function (origin, callback) {
    const isTrue = domains.indexOf(origin) !== -1;
    callback(null, isTrue);
  }
  ,
  credentials: true
}


const app = express();

app.use(cors(corsOptions));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// configuration =========================
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Root222');
});

app.get('/board', (req, res) => {
  connection.query('SELECT * from topic', (error, rows) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});


app.post('/board', (req, res) => {
  
  connection.query(`INSERT INTO topic (title, description, created)  values (?, ?, now());`, [req.body.title, req.body.desc], (error, rows) => {
    if (error) throw error;
    res.status(200).send('성공');
  });
});


app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});