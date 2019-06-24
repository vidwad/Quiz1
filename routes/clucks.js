const express = require("express");
const router = express.Router();
const knex = require("../db/client");


router.get("/", (req, res) => {
  knex("clucks")
    .orderBy("createdAt", "DESC")
    .then(clucks => {
     res.render("clucks/index", { clucks: clucks });
    });
});


router.get("/new", (req, res) => {
  res.render("clucks/new");
});


router.post("/", (req, res) => {

  knex("clucks") // --- START SQL
    .insert({
      image_url: req.body.image_url,
      content: req.body.content,
      username : req.body.username
    })
    .returning("*") // --- END SQL
    .then(data => {
     
      const cluck = data[0];
         
      res.redirect("clucks/");
    });
   
});



module.exports = router;
