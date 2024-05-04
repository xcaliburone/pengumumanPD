require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql')
const path = require('path');

// middleware
const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/public')));

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}); db.connect((err) => { if (err) throw err; console.log('Connected to MySQL database'); });

// Endpoint untuk API
app.get('/api/data', (req, res) => {
    const data = {
        message: 'Ini adalah data contoh dari server!'
    };
    res.json(data);
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