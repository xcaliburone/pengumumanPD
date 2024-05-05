import { useState } from "react";


function App() {
    const [nomorUjian, setNomorUjian] = useState("");
    const [siswa, setSiswa] = useState(null);
    const [error, setError] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await fetch(`http://localhost:8080/siswa/${encodeURIComponent(nomorUjian)}`);
            // const response = await fetch(`https://pengumuman-pd.vercel.app/siswa/${encodeURIComponent(nomorUjian)}`);
            // const backendUrl = process.env.REACT_APP_BACKEND_URL;
            // eslint-disable-next-line no-undef
            const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://pengumumanpd-production.up.railway.app';


            // const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/siswa/${encodeURIComponent(nomorUjian)}`);
            const response = await fetch(`${backendUrl}/siswa/${encodeURIComponent(nomorUjian)}`);
            if (!response.ok) {
                throw new Error('Nomor ujian tidak ditemukan');
            }
            const data = await response.json();
            setSiswa(data[0]);
            setShowResults(true);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleChange = (e) => {
        setNomorUjian(e.target.value);
    };

    return (
        <>
            {!showResults && (
                <div className="loginForm">
                    <div className="header">
                        {/* <div className="overlay"></div> */}
                        <img src="/prov.png" alt="LOGO PROVINSI SULSES" className="logoProv" />
                        <h1 className="titles">PENGUMUMAN HASIL UJIAN AKHIR SEKOLAH</h1>
                        <img src="/sman22gowa.ico" alt="LOGO SMAN 22 GOWA" className="logoSMA" />
                    </div>
                    <div className="modals">
                        <form onSubmit={handleSubmit}>
                            <label className="label" htmlFor="">Nomor Ujian :</label>
                            <input className="input" type="text" name="" id="" value={nomorUjian} onChange={handleChange} placeholder="Contoh: 12 - 34567 - 809" />
                            <button className="tombols" type="submit">Kirim</button>
                            {error && <p className="error">{error}</p>}
                        </form>
                    </div>
                </div>
            )}
            {showResults && (
                <div className="results">
                    {error && <p>{error}</p>}
                    {siswa && (
                        <>
                            <div className="announc">
                                {siswa.keterangan === 'LULUS' && (
                                    <h1>Siswa dinyatakan <strong>LULUS</strong></h1>
                                )}
                                {siswa.keterangan === 'LULUS BERSYARAT' && (
                                    <h1>Siswa dinyatakan <strong>LULUS BERSYARAT</strong></h1>
                                )}
                                {siswa.keterangan === 'KELULUSAN DITUNDA' && (
                                    <h1 className="hold"><strong>KELULUSAN DITUNDA</strong></h1>
                                )}
                            </div>
                            <h2 className="data">Data Siswa</h2>
                            <div className="datas">
                                <div className="data-item">
                                    <p>No. Peserta : {siswa.noPeserta}</p>
                                </div>
                                <div className="data-item">
                                    <p>Nama : {siswa.nama}</p>
                                </div>
                                <div className="data-item">
                                    <p>NIS : {siswa.nis}</p>
                                </div>
                                <div className="data-item">
                                    <p>NISN : {siswa.nisn}</p>
                                </div>
                                <div className="data-item">
                                    <p>Keterangan : {siswa.keterangan}</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default App;