const sqlite = require('sqlite3').verbose();
let db = my_database('./gallery.db');
var bodyParser = require('body-parser');
var express = require("express");
var app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.post('/post', function(req, res) {
	console.log(req.body);
	db.serialize(()=>{
		db.run('INSERT INTO gallery(id,author,alt,tags,image,description) VALUES(?,?,?,?,?,?)', [req.body.id, req.body.author, req.body.alt, req.body.tags, req.body.image, req.body.description], function(err) {
		  if (err) {
			res.statusCode = 400;
			res.json("Error encountered while inserting");
		  }	  
		  res.statusCode = 201;
		  res.json(req.body);
		});
	});
});

app.get('/get', function(req,res){
	db.serialize(()=>{
		db.all('SELECT * FROM gallery', function(err,row){     
		if(err){
			res.statusCode = 404;
			res.json("Error encountered while getting");
		}
		if (row.length > 0) {
			res.statusCode = 200;
			res.json(row);
			console.log();
		}
		else {
			res.statusCode = 204;
			res.json({});
		}
		});
	});
});

app.get('/getById/:id', function(req,res){
	db.serialize(()=>{
		db.all('SELECT id, author, alt, tags, image, description FROM gallery WHERE id = ?', [req.params.id], function(err,row){     
		if(err){
			res.statusCode = 404;
			res.json("Error encountered while getting");
		}
		if (row.length > 0) {
			res.statusCode = 200;
			res.json(row[0]);
			console.log();
		}
		else {
			res.statusCode = 204;
			res.json({});
		}
		});
	});
});

app.put('/put', function(req,res){
	db.serialize(()=>{
		db.run('UPDATE gallery SET author = ?, alt = ?, tags = ?, image = ?, description = ? WHERE id = ?', [req.body.author, req.body.alt, req.body.tags, req.body.image, req.body.description, req.body.id], function(err){
		if(err){
			res.statusCode = 400;
			res.json("Error encountered while updating");
		}
		res.statusCode = 200;
		res.json({});
		});
	});
});

app.delete('/delete/:id', function(req,res){
  db.serialize(()=>{
    db.run('DELETE FROM gallery WHERE id = ?', req.params.id, function(err) {
      if (err) {
		res.statusCode = 400;
        res.json("Error encountered while deleting");
      }
	  res.statusCode = 200;
      res.json({});
    });
  });
});

app.listen(3000);
console.log("Your Web server should be up and running, waiting for requests to come in. Try http://localhost:3000/hello");

function my_database(filename) {
	var db = new sqlite.Database(filename, (err) => {
  		if (err) {
			console.error(err.message);
  		}
  		console.log('Connected to the phones database.');
	});
	db.serialize(() => {
		db.run(`
        	CREATE TABLE IF NOT EXISTS gallery
        	 (
                    id INTEGER PRIMARY KEY,
                    author CHAR(100) NOT NULL,
                    alt CHAR(100) NOT NULL,
                    tags CHAR(256) NOT NULL,
                    image char(2048) NOT NULL,
                    description CHAR(1024) NOT NULL
		 )
		`);
		db.all(`select count(*) as count from gallery`, function(err, result) {
			if (result[0].count == 0) {
				db.run(`INSERT INTO gallery (author, alt, tags, image, description) VALUES (?, ?, ?, ?, ?)`, [
        			"Tim Berners-Lee",
        			"Image of Berners-Lee",
        			"html,http,url,cern,mit",
        			"https://upload.wikimedia.org/wikipedia/commons/9/9d/Sir_Tim_Berners-Lee.jpg",
        			"The internet and the Web aren't the same thing."
    				]);
				db.run(`INSERT INTO gallery (author, alt, tags, image, description) VALUES (?, ?, ?, ?, ?)`, [
        			"Grace Hopper",
        			"Image of Grace Hopper at the UNIVAC I console",
        			"programming,linking,navy",
        			"https://upload.wikimedia.org/wikipedia/commons/3/37/Grace_Hopper_and_UNIVAC.jpg",
				"Grace was very curious as a child; this was a lifelong trait. At the age of seven, she decided to determine how an alarm clock worked and dismantled seven alarm clocks before her mother realized what she was doing (she was then limited to one clock)."
    				]);
				console.log('Inserted dummy photo entry into empty database');
			} else {
				console.log("Database already contains", result[0].count, " item(s) at startup.");
			}
		});
	});
	return db;
}
