document.querySelector('submit', (e) => {
    e.preventDefaut();
    let userObj = {
        name: e.target.name.value,
        imageUrl: e.target.imageUrl.value,
        description: e.target.description.value,
        donations: 0
    };
    renderOnePhoto(userObj);
    handlePost(userObj);
});

function renderOnePhoto(user) {
    let card = document.createElement('li');
    card.className = "card"
    card.innerHTML = `
    <div class="image-list">
      <img src="${user.imageUrl}" class="users">
    </div>
    <br>
    <div class="content">
        <h4>${user.name}</h3>
            <p>
                $<span class="donation-count">${user.donations}</span> Donations
            </p>
            <br>
            <p>${user.description}</p>
            <hr>
    </div>
    <div class="buttons">
        <button id="donate">Donate $10</button>
        <button id="set_free">Set free</button>
    </div>
    `;
    card.querySelector('#donate').addEventListener('click', () => {
        user.donations += 10
        card.querySelector('span').textContent = user.donations
        updateDonation(user)
    });
    card.querySelector('#set_free').addEventListener('click', () => {
        card.remove()
        handleDelete(user.id);
    });
    document.querySelector('#photo-list').appendChild(card);
}

function handleGetAll() {
    fetch('http://localhost:3000/photoData')
        .then(res => res.json())
        .then(userData => userData.map(user => renderOnePhoto(user)))
}



function handleInitialize() {
    handleGetAll();
}
handleInitialize();