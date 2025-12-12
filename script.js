// Kunci Jawaban
const answers = {
  q1: 'c', q2: 'b', q3: 'b', q4: 'b', q5: 'true', q6: 'c', q7: 'b', q8: 'b',
  q9: 'c', q10: 'a', q11: 'b', q12: 'b', q13: 'true', q14: 'a', q15: 'b', q16: 'b',
  q17: 'a', q18: 'a', q19: 'false', q20: 'a', q21: 'b', q22: 'b', q23: 'a', q24: 'd',
  q25: 'c', q26: 'true', q27: 'b', q28: 'c', q29: 'c', q30: 'b', q31: 'b', q32: 'd',
  q33: 'true', q34: 'd', q35: 'a', q36: 'b', q37: 'b', q38: 'false', q39: 'b', q40: 'a',
  q41: 'b', q42: 'b', q43: 'true', q44: 'd', q45: 'c', q46: 'c', q47: 'c', q48: 'true',
  q49: 'b', q50: 'c'
};

// Periksa Jawaban
document.getElementById('checkBtn').addEventListener('click', () => {
  const form = document.getElementById('examForm');
  let totalPoints = 0, earned = 0;
  const moduleTotals = {};

  for (let i = 1; i <= 50; i++) {
    const qKey = 'q' + i;
    const el = form.elements[qKey];
    const card = document.querySelector('[name="' + qKey + '"]').closest('.q');
    const mod = card.getAttribute('data-module');
    const weight = Number(card.getAttribute('data-weight'));

    moduleTotals[mod] = moduleTotals[mod] || { max: 0, earned: 0, wrong: [] };
    moduleTotals[mod].max += weight;
    totalPoints += weight;

    let userAns = null;
    if (el.length !== undefined) {
      for (const r of el) {
        if (r.checked) { userAns = r.value; break; }
      }
    } else {
      userAns = el.value;
    }

    const correct = answers[qKey];
    if (userAns === correct) {
      earned += weight;
      moduleTotals[mod].earned += weight;
    } else {
      moduleTotals[mod].wrong.push(i);
    }
  }

  const percent = Math.round((earned / totalPoints) * 100);
  document.getElementById('results').style.display = 'block';
  document.getElementById('scoreText').innerText = earned + ' / ' + totalPoints + ' poin';
  document.getElementById('percentText').innerText = percent + '% benar';
  document.getElementById('scoreBar').style.width = percent + '%';

  const modFeedbackEl = document.getElementById('moduleFeedback');
  modFeedbackEl.innerHTML = '<strong>Analisis per modul</strong>';
  const modKeys = Object.keys(moduleTotals).sort();
  const lines = document.createElement('div');
  lines.style.marginTop = '8px';

  modKeys.forEach(m => {
    const data = moduleTotals[m];
    const pct = Math.round((data.earned / data.max) * 100);
    const div = document.createElement('div');
    div.style.marginTop = '6px';
    div.innerHTML = '<strong>Modul ' + m + '</strong>: ' +
      data.earned + '/' + data.max + ' (' + pct + '%)' +
      (data.wrong.length ? ' — Soal salah: ' + data.wrong.join(', ') : ' — Semua benar');
    lines.appendChild(div);
  });

  modFeedbackEl.appendChild(lines);
});

// Pembahasan Ringkas
document.getElementById('explainBtn').addEventListener('click', () => {
  const box = document.getElementById('detailedExplanations');

  if (box.style.display === 'none') {
    const exp = document.createElement('div');
    exp.innerHTML = '<h4>Pembahasan Singkat</h4>';

    const ul = document.createElement('ol');
    ul.style.paddingLeft = '18px';

    for (let i = 1; i <= 50; i++) {
      const li = document.createElement('li');
      li.style.marginBottom = '6px';
      li.innerHTML = '<strong>Soal ' + i + '</strong>: Kunci = <code>' +
                      answers['q' + i] +
                      '</code>. <span class="small">' +
                      shortExplain(i) + '</span>';

      ul.appendChild(li);
    }

    exp.appendChild(ul);
    box.innerHTML = '';
    box.appendChild(exp);
    box.style.display = 'block';
    document.getElementById('explainBtn').innerText = 'Sembunyikan Pembahasan';

  } else {
    box.style.display = 'none';
    document.getElementById('explainBtn').innerText = 'Minta Pembahasan';
  }
});

// Penjelasan Singkat Tiap Soal
function shortExplain(n) {
  const map = {
    1: 'Informasi relevan membantu pengambil keputusan.',
    2: 'Akuntansi melayani berbagai pemakai eksternal dan internal.',
    3: 'Dasar akrual benar; pengakuan pendapatan bukan hanya saat kas diterima.',
    4: 'Pendapatan naik kas turun → banyak penjualan kredit.',
    5: 'Konsep entitas memisahkan transaksi pribadi.',
    6: 'Kreditur fokus pada kemampuan bayar.',
    7: 'Standar memungkinkan perbandingan.',
    8: 'Historical cost wajib gunakan harga perolehan.',
    9: 'Jurnal adalah langkah awal siklus.',
    10:'Penyesuaian mengakui transaksi belum tercatat.',
    11:'Depresiasi non-cash.',
    12:'Tidak menyesuaikan → laba overstated.',
    13:'Transaksi internal tetap dicatat.',
    14:'Persediaan akhir memengaruhi HPP.',
    15:'Posting memindah ke buku besar.',
    16:'Neraca lajur mendeteksi kesalahan.',
    17:'Akun nominal ditutup.',
    18:'Modal periode berikut salah jika beban tidak ditutup.',
    19:'Tidak otomatis berpindah.',
    20:'Kesalahan simetris tetap seimbang.',
    21:'Neraca: aset, kewajiban, ekuitas.',
    22:'Beban diakui saat manfaat dikonsumsi.',
    23:'Pendapatan non-operasional salah klasifikasi → laba operasi bias.',
    24:'Arus kas berbasis kas, depresiasi non-cash.',
    25:'Laba meningkatkan ekuitas.',
    26:'Utang lancar → berdasarkan jatuh tempo.',
    27:'Metode langsung tampilkan penerimaan/pengeluaran kas.',
    28:'Aset besar kas kecil → aset tidak lancar dominan.',
    29:'Dagang = beli dan jual kembali.',
    30:'Pembelian kredit → jurnal pembelian.',
    31:'Potongan pembelian bukan jurnal penjualan.',
    32:'Kesalahan klasifikasi memengaruhi laba operasi.',
    33:'HPP wajib untuk perusahaan dagang.',
    34:'Jurnal persediaan bukan jurnal khusus.',
    35:'Modal awal dari setoran sekutu.',
    36:'Struktur modal memengaruhi bagi laba.',
    37:'Pembagian berdasarkan jasa.',
    38:'Pembubaran tidak hanya karena kematian.',
    39:'Modal saham dari investasi pemegang saham.',
    40:'Preferen: hak dividen tetap.',
    41:'Dividen tunai bukan beban.',
    42:'Treasury stock mengurangi ekuitas.',
    43:'Dividen saham tidak kurangi aset.',
    44:'Dividen penjualan bukan jenis dividen.',
    45:'≥ 1 tahun = utang jangka panjang.',
    46:'Nilai kini ditentukan bunga/waktu.',
    47:'Diskonto jika pasar > kupon.',
    48:'Investasi jangka panjang → biaya/ekuitas.',
    49:'20%+ → metode ekuitas.',
    50:'HTM = dimiliki hingga jatuh tempo.'
  };
  return map[n] || 'Tidak ada pembahasan.';
}
