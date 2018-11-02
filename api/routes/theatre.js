const express = require("express");
const router = express.Router();
const Theatre = require("../models/theatre");
const mongoose = require("mongoose");

// route to check all theater----
router.get("/", (req, res) => {
  Theatre.find()
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc.length >= 0) {
        res.status(200).json(doc);
      } else {
        res.status(400).json({ mes: "no entry found ...." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
    });
});

//route to post data in database
router.post("/", (req, res) => {
  const theatre = new Theatre({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    filmName: req.body.filmName
  });
  theatre
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Successfully saved theater info -_- -_- -_-"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ err });
    });
});

// route to get specific theater
router.get("/:theatreId", (req, res) => {
  const id = req.params.theatreId;
  Theatre.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ mes: "no valid id found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500);
    });
});

router.post("/:theatreId", (req, res) => {
  res.status(200).json({
    message: "Handling post request for theatre"
  });
});

router.patch("/:theatreId", (req, res) => {
  const id = req.params.theatreId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Theatre.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// route to delete the specific route
router.delete("/:theatreId", (req, res) => {
  const id = req.params.theatreId;
  Theatre.remove({ _id: id })
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
    });
});

module.exports = router;
