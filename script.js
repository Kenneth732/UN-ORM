document.querySelector('#form-list').addEventListener('submit', (e)=>{
    e.preventDefault();
    let userObj = {
        name: e.target.name.value,
        imageUrl: e.target.imageUrl.value,
        description: e.target.description.value,
        donations: 0
    }
    renderOnePhoto(userObj);
    donatePhoto(userObj);
})

function renderOnePhoto(user){
    let card = document.createElement('li');
    card.className = 'card';
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
      card.querySelector('#donate').addEventListener('click', () =>{
        user.donations += 10
        card.querySelector('span').textContent = user.donations
        updateDonation(user)
      })
      card.querySelector('#set_free').addEventListener('click', () => {
        card.remove()
        deleteCard(user.id)
      })
    document.querySelector('#photo-list').appendChild(card)
}

function handleGetAll(){
    fetch('http://localhost:3000/photoData')
    .then((res) => res.json())
    // .then(userData => userData.map(user => handleRender(user)))
    .then(userData => userData.forEach(user => renderOnePhoto(user)))
    .catch(error => console.error(error))
}

function handlePost(userObj){
    fetch(`http://localhost:3000/photoData`, {
        method: "POST",
        headers:{
            "Content-Type": "appication/json"
        },
        body:JSON.stringify(userObj)
    }).then((res) => res.json())
    .then(user => console.log(user))
    .catch(error => console.error(error))
}

function handleUpdate(userObj){
    fetch(`http://localhost:3000/photoData/${userObj}`, {
        method: 'PATCH',
        headers:{
            "Content-Type": 'appication/json'
        },
        body:JSON.stringify(userObj)
    }).then((res) => res.json())
    .then((user) => console.log(user));
}
function handleDelete(id){
    fetch(`http://localhost:3000/picData/${id}`, {
        method: 'DELETE',
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Failed to delete photo data');
        }
        return response.json();
    })
    .then((data) => {
        console.log('Photo data deleted successfully:', data);
        // remove the deleted card from the DOM
        const cardToRemove = document.querySelector(`li[data-id="${id}"]`);
        if (cardToRemove) {
            cardToRemove.remove();
        }
    })
    .catch((error) => {
        console.error('Failed to delete photo data:', error);
    });
}

function handleInitialize(){
    handleGetAll();
}
handleInitialize();