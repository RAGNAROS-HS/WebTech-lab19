// ###############################################################################
//
// Database setup:
// First: Our code will open a sqlite database file for you, and create one if it not exists already.
// We are going to use the variable "db' to communicate to the database:
// If you want to start with a clean sheet, delete the file 'phones.db'.
// It will be automatically re-created and filled with one example item.

const sqlite = require('sqlite3').verbose();
let db = my_database('./gallery.db');

// ###############################################################################
// The database should be OK by now. Let's setup the Web server so we can start
// defining routes.
//
// First, create an express application `app`:

var express = require("express");
var app = express();

// We need some middleware to parse JSON data in the body of our HTTP requests:
app.use(express.json());


// ###############################################################################
// Routes

app.get('/post/:id/:author/:alt/:tags/:image/:description', function(req,res){
	db.serialize(()=>{
	  db.run('INSERT INTO gallery(id,author,alt,tags,image,description) VALUES(?,?,?,?,?,?)', [req.params.id, req.params.author, req.params.alt, req.params.tags, req.params.image, req.params.description], function(err) {
		if (err) {
		  res.status(404).send("Error 404");
		  return console.log(err.message);
		}
		
		console.log("New person has been added");
		res.status(200).send("OK");
		res.send("New person has been added into the database with ID = "+req.params.id+ ", name = "+req.params.author+", alt = "+req.params.alt+", tags = "+req.params.tags+", image = "+req.params.image+" and description "+req.params.description+"");
	  });
  });
  });

  app.get('/get', function(req,res){
	db.serialize(()=>{
	  db.all('SELECT * FROM gallery', function(err,row){     
		if(err){
		  res.send("Error encountered while displaying");
		  return console.error(err.message);
		}
		res.writeHead(200, {'Content-Type' : 'application/json'});
		res.json(row);
		console.log("Entry displayed successfully");
	  });
	});
  });

  app.get('/getById/:id', function(req,res){
	db.serialize(()=>{
	  db.all('SELECT id, author, alt, tags, image, description FROM gallery WHERE id = ?', [req.params.id], function(err,row){     
		if(err){
		  res.send("Error encountered while displaying");
		  return console.error(err.message);
		}
		res.writeHead(200, {'Content-Type' : 'application/json'});
		res.json(row[0]);
		console.log("Entry displayed successfully");
	  });
	});
  });

  app.get('/put/:author/:alt/:tags/:image/:description/:id', function(req,res){
	db.serialize(()=>{
	  db.run('UPDATE gallery SET author = ?, alt = ?, tags = ?, image = ?, description = ? WHERE id = ?', [req.params.id], function(err){
		if(err){
		  res.send("Error encountered while updating");
		  return console.error(err.message);
		}
		res.send("Entry updated successfully");
		console.log("Entry updated successfully");
	  });
	});
  });

  app.get('/delete/:id', function(req,res){
  db.serialize(()=>{
    db.run('DELETE FROM gallery WHERE id = ?', req.params.id, function(err) {
      if (err) {
        res.send("Error encountered while deleting");
        return console.error(err.message);
      }
	  res.status(200);
      res.send("Entry deleted");
      console.log("Entry deleted");
    });
  });
});
// 
// TODO: Add your routes here and remove the example routes once you know how
//       everything works.
// ###############################################################################

// This example route responds to http://localhost:3000/hello with an example JSON object.
// Please test if this works on your own device before you make any changes.

app.get("/hello", function(req, res) {
    response_body = {'Hello': 'World'} ;

    // This example returns valid JSON in the response, but does not yet set the
    // associated HTTP response header.  This you should do yourself in your
    // own routes!
    res.json(response_body) ;
});

// This route responds to http://localhost:3000/db-example by selecting some data from the
// database and return it as JSON object.
// Please test if this works on your own device before you make any changes.
app.get('/db-example', function(req, res) {
    // Example SQL statement to select the name of all products from a specific brand
	db.all(`SELECT * FROM gallery WHERE author=?`, ['Grace Hopper'], function(err, rows) {
	
    	// TODO: add code that checks for errors so you know what went wrong if anything went wrong
    	// TODO: set the appropriate HTTP response headers and HTTP response codes here.

    	// # Return db response as JSON
    	return res.json(rows)
    });
});

app.post('/post-example', function(req, res) {
	// This is just to check if there is any data posted in the body of the HTTP request:
	console.log(req.body);
	return res.json(req.body);
});


// ###############################################################################
// This should start the server, after the routes have been defined, at port 3000:

app.listen(3000);
console.log("Your Web server should be up and running, waiting for requests to come in. Try http://localhost:3000/hello");

// ###############################################################################
// Some helper functions called above
function my_database(filename) {
	// Conncect to db by opening filename, create filename if it does not exist:
	var db = new sqlite.Database(filename, (err) => {
  		if (err) {
			console.error(err.message);
  		}
  		console.log('Connected to the phones database.');
	});
	// Create our phones table if it does not exist already:
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
