function searchData() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    fetch("data.csv")
        .then(response => response.text())
        .then(csvText => {
            const rows = csvText.split("\n");
            const results = document.querySelector("#results");
            results.innerHTML = ""; // Kosongkan hasil pencarian sebelumnya

            let foundData = false; // Flag untuk mengecek apakah ada data yang ditemukan

            rows.forEach((row, index) => {
                if (index === 0) return; // Lewati header

                const columns = row.split(",");
                const siteId = columns[0].toLowerCase();
                const ipAddress = columns[1].toLowerCase();

                // Cek apakah input cocok dengan IP Address atau Site ID
                if (siteId.includes(input) || ipAddress.includes(input)) {
                    foundData = true; // Menandakan data ditemukan

                    const resultItem = document.createElement("div");
                    resultItem.classList.add("result-item");

                    columns.forEach((col, i) => {
                        const div = document.createElement("div");
                        div.classList.add("value");
                        div.innerHTML = `<span class="label">${getColumnLabel(i)}:</span> ${col}`;
                        resultItem.appendChild(div);
                    });

                    results.appendChild(resultItem);
                }
            });

            // Jika tidak ada data yang ditemukan, tampilkan pesan "Data tidak ditemukan"
            if (!foundData) {
                const noResults = document.createElement("div");
                noResults.classList.add("no-results");
                noResults.textContent = "Data tidak ditemukan";
                results.appendChild(noResults);
            }
        });
}

// Fungsi untuk memberikan label yang sesuai dengan kolom
function getColumnLabel(index) {
    const labels = [
        "SITE ID", "IP ADDRESS", "LOKASI", "KANCA", "KANWIL", "PROVIDER", 
        "PIC", "ALAMAT", "MAP", "TID ATM / CRM", "OPERASIONAL ATM / CRM", 
        "GW", "STATUS", "BEAM", "LAST SQF", "LAST ESNO", "SQF MINIMAL", "NOTE"
    ];
    return labels[index] || `Kolom ${index + 1}`;
}
