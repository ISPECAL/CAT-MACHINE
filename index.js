const URL = 'https://api.thecatapi.com/v1/images/search?include_breeds=true';
const apiKey = 'live_hZ4L5c1o49RNY5n0nrY4aWJ2YmFUitBWKHiapceGTXj3Ll7LlxEncNEh5cK6vYPh'


let button = document.getElementById("catButton");
let catImage = document.getElementById("ranCatImg");
let catBreed = document.getElementById("catBreed");


function getRandCat() {

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
        })
        .catch(error => console.error("Error:", error));

}
button.addEventListener("click", getRandCat);




