const loadPhone = () => {
    const inputField = document.getElementById('search-field');
    const inputText = inputField.value;
    //clear input field
    inputField.value = '';
    // load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}

// display phone
const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone-container');
    //clear phone container
    phoneContainer.textContent = '';
    //clear no result area
    document.getElementById('no-result').textContent = '';

    if (phones.length === 0) {
        const noResult = document.getElementById('no-result');
        const h1 = document.createElement('h1');
        h1.classList.add('text-center');
        h1.innerText = 'No phone found';
        noResult.appendChild(h1);
    }
    else {
        //showing phone within twewnty 
        const twentyPhones = phones.slice(0, 20);
        twentyPhones.forEach(phone => {
            // console.log(phone)
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card rounded-3">
                <img height="400px" width="150px" src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title">${phone.brand}</h4>
                    <p class="card-text">${phone.phone_name}</p>
                    <p onclick="loadDetails('${phone.slug}')" class="text-center text-white bg-dark rounded-3 px-4 py-2">Show details</p>
                </div>
            </div>
        `;
            phoneContainer.appendChild(div);
        })
    }
}
//load detail 
const loadDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data));
}

//display details
const displayDetails = detail => {
    console.log(detail)
    const showDetails = document.getElementById('show-details');
    showDetails.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
             <img height="450px" width="350px" src="${detail.image}">
             <h4>${detail.releaseDate ? detail.releaseDate : 'No release date found'}</h4>
             <p>${detail.mainFeatures.displaySize}</p>
             <p>${detail.mainFeatures.memory}</p>
             <p>${detail.mainFeatures.chipSet}</p>
             <p>${detail.mainFeatures.storage}</p>    
    `;
    showDetails.appendChild(div)
}


