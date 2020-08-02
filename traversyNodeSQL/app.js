const express= require('express');
const mysql = require('mysql');

//  create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeMySQL'
});

//  Connect

db.connect((err) => {
    if(err){
        console.log(err.code);
    }

    console.log('MySQL connected');
});

const app = express();

// Create DB
app.get('/createDB', (req,res) => {
    let sql = 'CREATE DATABASE nodeMySQL';
    db.query(sql, (err, result) => {
        if(err) console.log(err.code);
        console.log(result);
        res.send('Database created....');
    });
});

// Create Table
app.get("/createPostTable", (req,res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';

    db.query(sql, (err,result) => {
        if(err) console.log(err.code);
        console.log(result);
        res.send('Posts table created....');
    })
});

// Insert post 1 
app.get('/addPost1', (req,res) => {
    let post = {title: 'Post One', body: 'This is post number one'};
    let sql = 'INSERT INTO posts SET ?';

    let query = db.query(sql, post, (err, result) => {
       if(err) console.log(err.code);
       console.log(result);
       
       res.send('Post 1 added....');
    });
});

// Insert post 2
app.get('/addPost2', (req,res) => {
    let post = {title: 'Post Two', body: 'This is post number two'};
    let sql = 'INSERT INTO posts SET ?';

    let query = db.query(sql, post, (err, result) => {
       if(err) console.log(err.code);
       console.log(result);
       
       res.send('Post 2 added....');
    });
});

// Select posts
app.get('/getPost', (req,res) => {
    let sql = 'SELECT * FROM posts';

    let query = db.query(sql, (err, results) => {
       if(err) console.log(err.code);
       console.log(results);
       
       res.send('Posts Fetched');
    });
});

// Get Single Post
app.get('/getParticularPost/:id', (req,res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;

    let query = db.query(sql, (err, result) => {
       if(err) console.log(err.code);
       console.log(result);
       
       res.send('Post Fetched');
    });
});

// Update post
app.get('/updateParticularPost/:id', (req,res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id  = ${req.params.id}`;

    let query = db.query(sql, (err, result) => {
       if(err) console.log(err.code);
       console.log(result);
       
       res.send(`Post's title updated`);
    });
});

// Delete post
app.get('/deletePost/:id', (req,res) => {
    let sql = `DELETE FROM posts WHERE id  = ${req.params.id}`;

    let query = db.query(sql, (err, result) => {
       if(err) console.log(err.code);
       console.log(result);
       
       res.send(`Post ${req.params.id} deleted`);
    });
});
// Listening port
app.listen('3000', () => {
    console.log('Server started on port 3000');
});

