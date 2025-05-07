document.addEventListener("DOMContentLoaded", () => {
    const map = document.getElementById("map");
    const search = document.getElementById("searchBar");
  
    if (map) {
      fetch("vendors.json")
        .then((res) => res.json())
        .then((vendors) => {
          vendors.forEach((vendor) => {
            const div = document.createElement("div");
            div.className = "stall";
            div.innerText = vendor.stall + "\n" + vendor.name;
            div.onclick = () => {
              localStorage.setItem("vendor", JSON.stringify(vendor));
              window.location.href = "vendor.html";
            };
            map.appendChild(div);
          });
  
          if (search) {
            search.addEventListener("input", () => {
              const value = search.value.toLowerCase();
              const filtered = vendors.filter(v => v.name.toLowerCase().includes(value) || v.category.toLowerCase().includes(value));
              map.innerHTML = "";
              filtered.forEach((vendor) => {
                const div = document.createElement("div");
                div.className = "stall";
                div.innerText = vendor.stall + "\n" + vendor.name;
                div.onclick = () => {
                  localStorage.setItem("vendor", JSON.stringify(vendor));
                  window.location.href = "vendor.html";
                };
                map.appendChild(div);
              });
            });
          }
        });
    }
  
    const vendorDetails = document.getElementById("vendorDetails");
    if (vendorDetails) {
      const vendor = JSON.parse(localStorage.getItem("vendor"));
      if (vendor) {
        vendorDetails.innerHTML = `
          <h2>${vendor.name}</h2>
          <p><strong>Category:</strong> ${vendor.category}</p>
          <p><strong>Stall:</strong> ${vendor.stall}</p>
          <p>${vendor.description}</p>
          <img src="${vendor.photo}" alt="${vendor.name}" style="max-width:200px" />
        `;
      }
    }
  });