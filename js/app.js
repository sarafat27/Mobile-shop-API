//spinner show
const showSpinner = displayType => {
    document.getElementById('spinner').style.display = displayType;
}
showSpinner('none');

//load data
const loadPhone = () => {
    const inputField = document.getElementById('search-field');
    const inputText = inputField.value;
    //clear input field
    inputField.value = '';
    //clear no result area
    document.getElementById('no-result').textContent = '';
    //show spinner
    showSpinner('block');

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
    //clear details area
    document.getElementById('show-details').textContent = '';

    if (phones.length === 0) {
        const noResult = document.getElementById('no-result');
        const h1 = document.createElement('h1');
        h1.classList.add('text-center', 'text-white');
        h1.innerText = 'No phone found';
        noResult.appendChild(h1);
    }
    else {
        //showing phone within twewnty 
        const twentyPhones = phones.slice(0, 20);
        twentyPhones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card rounded-3">
                <img height="400px" width="150px" src="${phone.image}" class="card-img-top p-4" alt="...">
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
    showSpinner('none');
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
    const showDetails = document.getElementById('show-details');
    showDetails.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <img height="450px" width="350px" src="${detail.image}">
    <h4 class="card-title">${detail.brand}</h4>
    <h4 class="card-title">${detail.phone_name ? detail.phone_name : ''}</h4>
    <h6>${detail.releaseDate ? detail.releaseDate : 'No release date found'}</h6>

    <h3>Main configures :</h3>
    <p><strong>Display size : </strong>${detail.mainFeatures.displaySize}</p>
    <p><strong>Memory : </strong>${detail.mainFeatures.memory}</p>
    <p><strong>Chipset : </strong>${detail.mainFeatures.chipSet}</p>
    <p><strong>Storage : </strong>${detail.mainFeatures.storage}</p>  
    
    <h3>Sensors : </h3>
        <p>1. ${detail.mainFeatures.sensors[0]}</p>
        <p>2. ${detail.mainFeatures.sensors[1]}</p>
        <p>3. ${detail.mainFeatures.sensors[2]}</p>
        <p>4. ${detail.mainFeatures.sensors[3]}</p>
        <p>5. ${detail.mainFeatures.sensors[4]}</p>
        <p>6. ${detail.mainFeatures.sensors[5]}</p>

    <h3>Others: </h3>
        <p><strong>Bluetooth : </strong>${detail.others?.Bluetooth ? detail.others.Bluetooth : ''}</p>
        <p><strong>GPS : </strong>${detail.others?.GPS ? detail.others.GPS : ''}</p>
        <p><strong>USB : </strong>${detail.others?.USB ? detail.others.USB : ''}</p>
        <p><strong>WLAN : </strong>${detail.others?.WLAN ? detail.others.WLAN : ''}</p>
    `;
    showDetails.appendChild(div)
}


