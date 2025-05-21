document.getElementById("listingForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const desc = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const images = document.getElementById("images").files;

  const listing = document.createElement("div");
  listing.innerHTML = `<h3>${title}</h3><p>${desc}</p><p>Price: $${price}</p>`;

  if (images.length > 0) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(images[0]);
    img.style.width = "100%";
    listing.appendChild(img);
  }

  document.getElementById("listingContainer").appendChild(listing);
});
