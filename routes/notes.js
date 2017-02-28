var express = require('express');
var router = express.Router();
const Storage = require("../storage/storage.js");
const _ = require("lodash");
const Handlebars = require('hbs');

router.all('*', function(req, res, next) {
	if(!req.user)
		res.redirect("/login");
	next();
});

router.get('/', function(req, res, next) {
	let user = req.user.username;
	let notes = Storage.find("notes", { user: user });
  	res.render('notes', { user: user, notes: notes });
});

router.get('/check', function(req, res, next) {
	let user = req.user.username;
	let notes = Storage.find("notes", { user: user });
  	res.render('partials/listNotes', { user: user, notes: notes });
});

router.post('/new',  function(req, res, next) {
	let nt_id = `note-${Date.now()}`;
	let note = {
		id: nt_id,
		text: req.body.note_body,
		user: req.user.username,
		timestamp: Date.now()
	};
	Storage.set("notes", nt_id, note);
	res.redirect("/notes");
});


router.put('/',  function(req, res, next) {
	let note_id = req.body.note_id;
	let note = Storage.get("notes", note_id);
	if(!note){
		note_id = note_id || `note-${Date.now()}`;
		note = {
			id: note_id,
			text: req.body.note_body,
			user: req.user.username,
			timestamp: Date.now()
		};
	}else{
		note.text = req.body.note_body;
		note.edited_timestamp = Date.now();
	}
	Storage.set("notes", note_id, note);
	res.status(204).send();
});


router.delete('/',  function(req, res, next) {
	let note_id = req.body.note_id;
	Storage.remove("notes", note_id);
	res.status(204).send();
});


module.exports = router;
