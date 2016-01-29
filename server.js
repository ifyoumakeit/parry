var express  = require('express'),
    pg = require('pg'),
    bodyParser = require('body-parser');

express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))

  .get('/api', function (req, res) {
    res.json(200, {msg: 'OK' });
  })

  .get('/api/digests', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      client.query('SELECT * FROM test_table', function(err, result) {
        done();
        if (err)
         { console.error(err); response.send("Error " + err); }
        else
         { response.render('pages/db', {results: result.rows} ); }
      });
    });
  })


  .use(express.static(__dirname + '/'))
  .listen(process.env.PORT || 5000);
