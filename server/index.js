require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql')
const path = require('path');

// middleware
const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from the client/public directory
app.use(express.static(path.join(__dirname, '../client/public')));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sman22gowa"
})

// Endpoint untuk API
app.get('/api/data', (req, res) => {
    // Logika untuk mengirim data dari server ke klien
});

app.get('/', (req, res) => {
    return res.redirect('/App')
})

app.get('/siswa/:nomorUjian', (req, res) => {
    const nomorUjian = req.params.nomorUjian;
    const sql = `SELECT * FROM siswa WHERE noPeserta = '${nomorUjian}';`;
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) {
            return res.send("Nomor ujian tidak ditemukan");
        }
        return res.json(data);
    });
});


app.get('/cek-siswa/:nomorUjian', (req, res) => {
    const nomorUjian = req.params.nomorUjian;
    const sql = `SELECT * FROM siswa WHERE noPeserta = '${nomorUjian}';`;
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) {
            return res.send("Nomor ujian tidak ditemukan");
        }

        const siswa = data[0];
        const { keterangan } = siswa;

        // Lakukan pengecekan keterangan
        if (keterangan === 'LULUS') {
            return res.redirect('/PageLulus');
        } else if (keterangan === 'lulus dengan catatan') {
            return res.redirect('/PageLulusDengan');
        } else if (keterangan === 'kelulusan ditunda') {
            return res.redirect('/PageLulusTunda');
        } else {
            return res.send("Keterangan tidak valid");
        }
    });
});


// app.get('')


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}....`))