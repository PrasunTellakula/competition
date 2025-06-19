// Product data (using Unsplash royalty-free images for accuracy)
const products = [
    {
      label: 'NEW',
      defaultImg: 'ms.jpg', // Green perfume bottle in nature
      lifestyleImg: 'ms1.jpg', // Perfume bottle closeup
      name: 'French Essence Luxury Perfume'
    },
    {
      label: 'NEW',
      defaultImg: 'vc.jpg', // Serum bottle with orange background
      lifestyleImg: 'vc1.jpg', // Serum bottle on white
      name: 'Pilgrim Vitamin C Face Serum'
    },
    {
      label: 'NEW',
      defaultImg: 'perfume.jpg', // Skincare bottles
      lifestyleImg: 'perfume1.jpg', // Cream with fruit
      name: 'Moisturizing Serum'
    },
    {
      label: 'NEW',
      defaultImg: 'vitamin-c.jpg', // Face cream jar
      lifestyleImg: 'vitamin-c1.jpg', // Cream with fruit
      name: 'Vitamin C Cream'
    }
  ];

let current = 0;
const container = document.querySelector('.carousel-container');

function render() {
  let html = '';
  html += '<button class="carousel-arrow left">&#8592;</button>';
  html += '<div class="carousel-cards">';
  // Left half
  html += `<div class="carousel-half">${renderCard(products[current])}</div>`;
  // Right half (if available)
  if (products[current + 1]) {
    html += `<div class="carousel-half">${renderCard(products[current + 1])}</div>`;
  } else {
    html += '<div class="carousel-half"></div>';
  }
  html += '</div>';
  html += '<button class="carousel-arrow right">&#8594;</button>';
  container.innerHTML = html;

  // Add to Bag feedback
  Array.from(container.querySelectorAll('.carousel-card')).forEach(card => {
    const btn = card.querySelector('.add-to-bag');
    const feedback = card.querySelector('.added-feedback');
    btn.onclick = () => {
      card.classList.add('added');
      setTimeout(() => {
        card.classList.remove('added');
      }, 1200);
    };
  });

  // Navigation
  container.querySelector('.carousel-arrow.left').onclick = () => {
    if (current > 0) {
      current -= 2;
      render();
    }
  };
  container.querySelector('.carousel-arrow.right').onclick = () => {
    if (current + 2 < products.length) {
      current += 2;
      render();
    }
  };
  // Hide left arrow if at start, right arrow if at end
  if (current === 0) container.querySelector('.carousel-arrow.left').style.visibility = 'hidden';
  if (current + 2 >= products.length) container.querySelector('.carousel-arrow.right').style.visibility = 'hidden';
}

function renderCard(prod) {
  if (!prod) return '';
  return `
    <div class="carousel-card">
      <span class="product-label">${prod.label}</span>
      <img class="product-img default" src="${prod.defaultImg}" alt="${prod.name}" />
      <img class="product-img lifestyle" src="${prod.lifestyleImg}" alt="${prod.name} Lifestyle" />
      <div class="added-feedback">Added!</div>
      <button class="add-to-bag">ADD TO BAG +</button>
    </div>
  `;
}

render(); 
