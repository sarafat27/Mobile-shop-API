const loadPhone = () => {
    const inputField = document.getElementById('search-field');
    const inputText = inputField.value;
    // load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}

// display phone


