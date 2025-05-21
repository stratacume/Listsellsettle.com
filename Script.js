// Array to store listings
let listings = [];

// Handle form submission
document.getElementById('listingForm')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.getElementById('propertyTitle').value;
  const description = document.getElementById('propertyDescription').value;
  const price = document.getElementById('propertyPrice').value;
  const image = document.getElementById('propertyImage').files[0];

  const reader = new FileReader();
  reader.onload = function(event) {
    const listing = {
      title,
      description,
      price,
      imageSrc: event.target.result
    };

    listings.push(listing);
    renderListings();
    this.reset();
  }.bind(this);

  if (image) {
    reader.readAsDataURL(image);
  } else {
    const listing = {
      title,
      description,
      price,
      imageSrc: ''
    };
    listings.push(listing);
    renderListings();
    this.reset();
  }
});

// Render listings to the page
function renderListings() {
  const container = document.getElementById('listingContainer');
  container.innerHTML = '';

  listings.forEach(listing => {
    const card = document.createElement('div');
    card.className = 'listing';

    card.innerHTML = `
      <h3>${listing.title}</h3>
      <p>${listing.description}</p>
      <p><strong>Price:</strong> $${listing.price}</p>
      ${listing.imageSrc ? `<img src="${listing.imageSrc}" alt="Property Image">` : ''}
    `;

    container.appendChild(card);
  });
}

// Generate PDF with clauses
function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const clauses = document.getElementById('editableClauses').value;

  doc.setFontSize(12);
  doc.text('Sale & Purchase Agreement', 10, 10);
  doc.text(clauses, 10, 20);

  doc.save('Agreement.pdf');
}
