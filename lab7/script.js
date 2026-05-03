const content = document.getElementById('main-content');

function loadCatalog() {
    fetch('data/categories.json')
        .then(res => res.json())
        .then(data => {
            let html = '<h2 class="mb-4">Menu Categories</h2><div class="list-group">';
            data.forEach(cat => {
                html += `<button class="list-group-item list-group-item-action" onclick="loadCategory('${cat.shortname}')">
                            <strong>${cat.name}</strong> - <small>${cat.notes}</small>
                         </button>`;
            });
            
            const randomIdx = Math.floor(Math.random() * data.length);
            const randomCat = data[randomIdx].shortname;
            html += `<button class="list-group-item list-group-item-action list-group-item-warning mt-3" 
                             onclick="loadCategory('${randomCat}')">✨ Specials (Random) ✨</button>`;
            
            html += '</div>';
            content.innerHTML = html;
        });
}

function loadCategory(shortname) {
    fetch(`data/${shortname}.json`)
        .then(res => res.json())
        .then(data => {
            let html = `<h2 class="mb-4">${data.category_name}</h2><div class="row">`;
            
            data.items.forEach(item => {
                html += `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <img src="https://placehold.co/200x150?text=${item.name}" class="card-img-top" alt="${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.description}</p>
                            <p class="text-primary fw-bold">${item.price} UAH</p>
                        </div>
                    </div>
                </div>`;
            });
            
            html += '</div><button class="btn btn-secondary" onclick="loadCatalog()">Back to Catalog</button>';
            content.innerHTML = html;
        });
}

// Подія для кнопки "Catalog" у навігації
document.getElementById('catalog-btn').addEventListener('click', loadCatalog);
