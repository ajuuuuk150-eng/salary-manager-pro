const TARIF = 44000;

const FAKTOR = {
  "1": 1.5,
  "1.5": 2.5,
  "3.5": 5.5,
  "4.5": 7.5
};

let data = JSON.parse(localStorage.getItem("salaryManager")) || {
  gaji: [],
  lembur: [],
  pengeluaran: []
};

function simpanData() {
  localStorage.setItem("salaryManager", JSON.stringify(data));
}

function rupiah(nominal) {
  return "Rp " + nominal.toLocaleString("id-ID");
}

function hitungDashboard() {

  let totalGaji = data.gaji.reduce((a,b)=>a+b.nominal,0);

  let totalLembur = data.lembur.reduce((a,b)=>a+b.nominal,0);

  let totalKeluar = data.pengeluaran.reduce((a,b)=>a+b.nominal,0);

  document.getElementById("totalGaji").innerHTML =
    rupiah(totalGaji);

  document.getElementById("totalLembur").innerHTML =
    rupiah(totalLembur);

  document.getElementById("totalKeluar").innerHTML =
    rupiah(totalKeluar);

  document.getElementById("saldo").innerHTML =
    rupiah(totalGaji + totalLembur - totalKeluar);

}

function tampilRiwayat() {

  const riwayat = document.getElementById("riwayat");

  riwayat.innerHTML = "";

  data.gaji.forEach(item => {

    riwayat.innerHTML += `
    <div class="riwayat-item">
      💰 <b>Gaji</b><br>
      📅 ${item.tanggal}<br>
      ${rupiah(item.nominal)}
    </div>
    `;

  });

  data.lembur.forEach(item => {

    riwayat.innerHTML += `
    <div class="riwayat-item">
      🕒 <b>Lembur ${item.jam} Jam</b><br>
      📅 ${item.tanggal}<br>
      ${rupiah(item.nominal)}
    </div>
    `;

  });

  data.pengeluaran.forEach(item => {

    riwayat.innerHTML += `
    <div class="riwayat-item">
      💸 <b>${item.nama}</b><br>
      📅 ${item.tanggal}<br>
      ${rupiah(item.nominal)}
    </div>
    `;

  });

}

function refresh() {

  hitungDashboard();

  tampilRiwayat();

}

refresh();

function bukaMenu(menu){

const area=document.getElementById("formArea");

if(menu=="gaji"){

area.innerHTML=`

<div class="card">

<h2>Tambah Gaji</h2>

<input type="date" id="tglGaji">

<input type="number" id="nominalGaji" placeholder="Nominal Gaji">

<button onclick="simpanGaji()">Simpan</button>

</div>

`;

}

if(menu=="lembur"){

area.innerHTML=`

<div class="card">

<h2>Tambah Lembur</h2>

<input type="date" id="tglLembur">

<select id="jamLembur">

<option value="1">1 Jam</option>

<option value="1.5">1.5 Jam</option>

<option value="3.5">3.5 Jam</option>

<option value="4.5">4.5 Jam</option>

</select>

<button onclick="simpanLembur()">Simpan</button>

</div>

`;

}

if(menu=="keluar"){

area.innerHTML=`

<div class="card">

<h2>Tambah Pengeluaran</h2>

<input type="date" id="tglKeluar">

<input type="text" id="namaKeluar" placeholder="Nama Pengeluaran">

<input type="number" id="nominalKeluar" placeholder="Nominal">

<button onclick="simpanKeluar()">Simpan</button>

</div>

`;

}

}

function simpanGaji(){

const tanggal=document.getElementById("tglGaji").value;

const nominal=Number(document.getElementById("nominalGaji").value);

if(!tanggal||nominal<=0){

alert("Lengkapi data");

return;

}

data.gaji.push({

tanggal,

nominal

});

simpanData();

refresh();

alert("Gaji berhasil disimpan");

}

function simpanLembur(){

const tanggal=document.getElementById("tglLembur").value;

const jam=document.getElementById("jamLembur").value;

const nominal=FAKTOR[jam]*TARIF;

if(!tanggal){

alert("Pilih tanggal");

return;

}

data.lembur.push({

tanggal,

jam,

nominal

});

simpanData();

refresh();

alert("Lembur berhasil disimpan");

}

function simpanKeluar(){

const tanggal=document.getElementById("tglKeluar").value;

const nama=document.getElementById("namaKeluar").value;

const nominal=Number(document.getElementById("nominalKeluar").value);

if(!tanggal||nama==""||nominal<=0){

alert("Lengkapi data");

return;

}

data.pengeluaran.push({

tanggal,

nama,

nominal

});

simpanData();

refresh();

alert("Pengeluaran berhasil disimpan");

}

function resetSemua(){

if(confirm("Yakin ingin menghapus semua data?")){

data={

gaji:[],

lembur:[],

pengeluaran:[]

};

simpanData();

refresh();

document.getElementById("formArea").innerHTML="";

alert("Semua data berhasil dihapus");

}

}
