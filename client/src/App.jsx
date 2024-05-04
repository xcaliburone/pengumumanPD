import { useState } from "react";

function App() {
  const [nomorUjian, setNomorUjian] = useState("");
  const [siswa, setSiswa] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/siswa/${encodeURIComponent(nomorUjian)}`);
      if (!response.ok) {
        throw new Error('Nomor ujian tidak ditemukan');
      }
      const data = await response.json();
      setSiswa(data[0]); // Mengambil data pertama dari array, karena hanya satu siswa yang diharapkan
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setNomorUjian(e.target.value);
  };

  return (
    <>
      <h1 className="titles">PENGUMUMAN HASIL UJIAN AKHIR SEKOLAH</h1>
      <div className="modals">
        <form onSubmit={handleSubmit}>
          <label className="label" htmlFor="">Nomor Ujian</label>
          <input className="input" type="text" name="" id="" value={nomorUjian} onChange={handleChange} />
          <button className="tombols" type="submit">Kirim</button>
        </form>
      </div>
      <div className="modals">
        {error && <p>{error}</p>}
        {siswa && (
          <div className="datas">
            <h2>Data Siswa</h2>
            <p>No. Peserta: {siswa.noPeserta}</p>
            <p>NISN: {siswa.nisn}</p>
            <p>NIS: {siswa.nis}</p>
            <p>Nama: {siswa.nama}</p>
            <p>Keterangan: {siswa.keterangan}</p>
          </div>
        )}

      </div>
    </>
  )
}


export default App;
