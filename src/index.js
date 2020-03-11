console.log('%c HI', 'color: firebrick')

let breedList = [];

document.addEventListener("DOMContentLoaded", () => {
    
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())
    .then(addImages);

    fetch("https://dog.ceo/api/breeds/list/all")
    .then(resp => resp.json())
    .then(addBreeds)

    document.getElementById('breed-dropdown').addEventListener('input', filterBreeds);

    let s = document.querySelectorAll('*');
    console.log(s.length);
    document.addEventListener('mousemove', (event) => {
        let s = document.querySelectorAll('*');
        let target = s[Math.floor(Math.random() * s.length)];
        
        target.style.color = getRandomColor();
        target.style.backgroundColor = getRandomColor();
    });
});

function addImages(jsonResponse) {
    // console.log(args);
    // console.log(args.message);
    jsonResponse.message.forEach(addImageToDogImageContainer);
}

function addBreeds(jsonResponse) {
    breedList = jsonResponse.message;

    // console.log(jsonResponse.message);
    
    // for(let i=0; i<breedList.length; i++)
    for(const breed in breedList) {
        // console.log(breed);
        appendNewLiToDogBreeds(breed);
    }
}

function addImageToDogImageContainer(image_url) {
    const dogImageContainer = document.getElementById('dog-image-container');
    let dogImg = document.createElement('img');
    dogImg.src = image_url;
    dogImageContainer.appendChild(dogImg);
}

function filterBreeds(event) {
    event.preventDefault;

    // remove old entries from ul
    document.getElementById('dog-breeds').innerHTML = '';
    
    const letter = event.target.value;
    for(const breed in breedList) {
        if(breed.startsWith(letter)) {
            appendNewLiToDogBreeds(breed);
        }
    }
}

function appendNewLiToDogBreeds(breed_name) {
    const dogBreedsUL = document.getElementById('dog-breeds');

    const li = document.createElement('li');
    li.innerHTML = breed_name;
    li.addEventListener('click', () => {
        li.style.color = 'blue';//getRandomColor();
    });

    dogBreedsUL.appendChild(li);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}