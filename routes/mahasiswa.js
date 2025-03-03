var express = require("express");
var router = express.Router();
var connection = require("../config/database");

// Tampilkan semua data mahasiswa (Read)
router.get("/", function (req, res, next) {
  connection.query(
    "SELECT * FROM mahasiswa ORDER BY id_mahasiswa DESC",
    function (err, rows) {
      if (err) {
        req.flash("error", err);
        res.redirect("/");
      } else {
        res.render("mahasiswa/index", { data: rows });
      }
    }
  );
});

// Tampilkan form tambah mahasiswa (Create)
router.get("/create", function (req, res, next) {
  res.render("mahasiswa/create");
});

// Simpan data mahasiswa baru (Store)
router.post("/store", function (req, res, next) {
  var {
    nama,
    nrp,
    tgl_lahir,
    jenis_kelamin,
    agama,
    hoby,
    alamat,
    program_studi,
  } = req.body;

  var sql =
    "INSERT INTO mahasiswa (nama, nrp, tgl_lahir, jenis_kelamin, agama, hoby, alamat, program_studi) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    sql,
    [nama, nrp, tgl_lahir, jenis_kelamin, agama, hoby, alamat, program_studi],
    function (err) {
      if (err) {
        req.flash("error", err);
        res.redirect("/mahasiswa");
      } else {
        req.flash("success", "Mahasiswa berhasil ditambahkan!");
        res.redirect("/mahasiswa");
      }
    }
  );
});

// Tampilkan form edit mahasiswa (Update)
router.get("/edit/:id", function (req, res, next) {
  var id = req.params.id;
  connection.query(
    "SELECT * FROM mahasiswa WHERE id_mahasiswa = ?",
    [id],
    function (err, rows) {
      if (err || rows.length === 0) {
        req.flash("error", "Mahasiswa tidak ditemukan!");
        res.redirect("/mahasiswa");
      } else {
        res.render("mahasiswa/edit", { data: rows[0] });
      }
    }
  );
});

// Proses update data mahasiswa
router.post("/update/:id", function (req, res, next) {
  var id = req.params.id;
  var {
    nama,
    nrp,
    tgl_lahir,
    jenis_kelamin,
    agama,
    hoby,
    alamat,
    program_studi,
  } = req.body;

  var sql =
    "UPDATE mahasiswa SET nama = ?, nrp = ?, tgl_lahir = ?, jenis_kelamin = ?, agama = ?, hoby = ?, alamat = ?, program_studi = ? WHERE id_mahasiswa = ?";
  connection.query(
    sql,
    [
      nama,
      nrp,
      tgl_lahir,
      jenis_kelamin,
      agama,
      hoby,
      alamat,
      program_studi,
      id,
    ],
    function (err) {
      if (err) {
        req.flash("error", err);
        res.redirect("/mahasiswa");
      } else {
        req.flash("success", "Mahasiswa berhasil diperbarui!");
        res.redirect("/mahasiswa");
      }
    }
  );
});

// Hapus data mahasiswa (Delete)
router.get("/delete/:id", function (req, res, next) {
  var id = req.params.id;
  connection.query(
    "DELETE FROM mahasiswa WHERE id_mahasiswa = ?",
    [id],
    function (err) {
      if (err) {
        req.flash("error", err);
        res.redirect("/mahasiswa");
      } else {
        req.flash("success", "Mahasiswa berhasil dihapus!");
        res.redirect("/mahasiswa");
      }
    }
  );
});

module.exports = router;
