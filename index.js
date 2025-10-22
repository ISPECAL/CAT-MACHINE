const URL = 'https://api.thecatapi.com/v1/images/search?include_breeds=true';
const apiKey = 'live_hZ4L5c1o49RNY5n0nrY4aWJ2YmFUitBWKHiapceGTXj3Ll7LlxEncNEh5cK6vYPh'
const breedListURL = 'https://api.thecatapi.com/v1/breeds';

let button = document.getElementById("catButton");
let catImage = document.getElementById("ranCatImg");
let catBreed = document.getElementById("catBreed");
let breeds_List = document.getElementById("breedList");
let breedButton = document.getElementById("CatBreedsButton");


function getRandCat() {



    const loader = document.getElementById("loadingImg");
    loader.style.display = "block";
    catImage.style.display = "none";


    fetch(URL, {
        method: "GET",
        headers: { "x-api-key": apiKey }
    })
        .then(response => response.json())
        .then(data => {
            const cat = data[0];

            if (!catBreed || cat.breeds.length === 0) {
                getRandCat();
                return;
            }


            const breed = data[0].breeds[0]?.name || "Unknown Breed";
            console.log(data);

            catImage.src = cat.url
            catBreed.textContent = breed;
            loader.style.display = "none";
            catImage.style.display = "block";
        })

        .catch(error => console.error("Error:", error));

}
button.addEventListener("click", getRandCat);



function getBreeds() {

    breeds_List.innerHTML = "";
    fetch(breedListURL, {
        method: "GET",
        headers: { "x-api-key": apiKey }
    })

        .then(response => response.json())
        .then(data => {
            const randBreeds = data.sort(() => Math.random() - 0.5);
            randBreeds.slice(0, 3).forEach(breed => {

                const li = document.createElement("li");
                li.textContent = `${breed.name} - ${breed.origin}`;
                breeds_List.appendChild(li);
            });
        })
        .catch(error => console.error("Error:", error));



}
breedButton.addEventListener("click", getBreeds);