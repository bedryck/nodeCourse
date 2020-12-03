const { Router } = require("express");
const formidable = require("formidable");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const fs = require("fs");

const router = Router();

router.get("/", auth, (req, res) => {
  const conn = mongoose.connection;

  const gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "photos",
  });

  const id = req.user.imgId;

  try {
    if (id) {
      let downloadStream = gridFSBucket.openDownloadStream(id);

      downloadStream.on("data", (chunk) => {
        const buf = Buffer.from(chunk);

        return res.render("profile", {
          user: req.user.toObject(),
          image: buf.toString("base64"),
          errors: req.flash("errors"),
        });
      });
    } else {
      return res.render("profile", {
        user: req.user.toObject(),
        image: null,
        errors: req.flash("errors"),
      });
    }
  } catch (error) {
    return res.render("profile", {
      user: req.user.toObject(),
      image: null,
      errors: req.flash("errors"),
    });
  }
});

router.post("/", auth, (req, res, next) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    const { avatar } = files;

    if (avatar.size) {
      if (avatar.size > 100000) {
        req.flash("errors", "Розмір аватара за великий");
        return res.redirect("/profile");
      }

      const conn = mongoose.connection;

      const gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "photos",
      });

      const writeStream = gridFSBucket.openUploadStream(avatar.name);
      let id = writeStream.id;

      fs.createReadStream(avatar.path)
        .pipe(writeStream)
        .on("error", function (error) {
          console.log(error);
        })
        .on("finish", async function () {
          console.log("done! id:", id);
          req.user.imgId = id;

          await req.user.save();
          return res.redirect("/profile");
        });
    } else {
      req.user.name = fields.name;
      await req.user.save();
      return res.redirect("/profile");
    }
  });
});

module.exports = router;
