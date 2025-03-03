var express = require("express");
var router = express.Router();
var connection = require("../config/database.js");

// Rute untuk menampilkan semua kategori
router.get("/", function (req, res, next) {
  connection.query(
    "SELECT * FROM kategori ORDER BY id_kategori DESC",
    function (err, rows) {
      if (err) {
        req.flash("error", err);
        res.redirect("/");
      } else {
        res.render("kategori/index", {
          data: rows,
        });
      }
    }
  );
});

// Rute untuk menampilkan halaman tambah kategori
router.get("/create", function (req, res, next) {
  res.render("kategori/create");
});

// Rute untuk menyimpan data kategori baru
router.post("/store", function (req, res, next) {
  var nama_kategori = req.body.nama_kategori;

  if (!nama_kategori) {
    req.flash("error", "Nama kategori tidak boleh kosong!");
    return res.redirect("/kategori/create");
  }

  var sql = "INSERT INTO kategori (nama_kategori) VALUES (?)";
  connection.query(sql, [nama_kategori], function (err, result) {
    if (err) {
      req.flash("error", err);
      res.redirect("/kategori");
    } else {
      req.flash("success", "Kategori berhasil ditambahkan!");
      res.redirect("/kategori");
    }
  });
});

// Rute untuk menampilkan halaman edit kategori
router.get("/edit/:id", function (req, res, next) {
  var id = req.params.id;
  connection.query(
    "SELECT * FROM kategori WHERE id_kategori = ?",
    [id],
    function (err, rows) {
      if (err || rows.length === 0) {
        req.flash("error", "Kategori tidak ditemukan!");
        res.redirect("/kategori");
      } else {
        res.render("kategori/edit", {
          data: rows[0],
        });
      }
    }
  );
});

// Rute untuk memperbarui data kategori
router.post("/update/:id", function (req, res, next) {
  var id = req.params.id;
  var nama_kategori = req.body.nama_kategori;

  if (!nama_kategori) {
    req.flash("error", "Nama kategori tidak boleh kosong!");
    return res.redirect("/kategori/edit/" + id);
  }

  var sql = "UPDATE kategori SET nama_kategori = ? WHERE id_kategori = ?";
  connection.query(sql, [nama_kategori, id], function (err, result) {
    if (err) {
      req.flash("error", err);
      res.redirect("/kategori");
    } else {
      req.flash("success", "Kategori berhasil diperbarui!");
      res.redirect("/kategori");
    }
  });
});

// Rute untuk menghapus data kategori
router.get("/delete/:id", function (req, res, next) {
  var id = req.params.id;

  var sql = "DELETE FROM kategori WHERE id_kategori = ?";
  connection.query(sql, [id], function (err, result) {
    if (err) {
      req.flash("error", err);
    } else {
      req.flash("success", "Kategori berhasil dihapus!");
    }
    res.redirect("/kategori");
  });
});

module.exports = router;
