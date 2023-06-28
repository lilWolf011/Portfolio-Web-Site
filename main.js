
let button = document.getElementById("button"); // html_url
let avatar = document.getElementById("avatar"); // pp otomatik değişecek

const projectTemplate = document.querySelector('#proje');
const projectContainer = document.getElementById('projects');

const token = '';
//fetch('https://api.github.com/users/VazkiiMods/repos?type=all', {

document.addEventListener("DOMContentLoaded", function() {
  // Kodunuz burada çalıştırılacak
  fetch("https://api.github.com/users/VazkiiMods/repos?type=all")
    .then(response => response.json())
    .then(data => {
      console.log(data);

      // Verileri "star" değerine göre sırala
      data.sort((a, b) => b.stargazers_count - a.stargazers_count);

      var firstMaxStarItem = data[0];
      var secondMaxStarItem = data[1];
      var thirdMaxStarItem = data[2];

      console.log("En büyük star değerine sahip olan öğe: ", firstMaxStarItem);
      console.log("İkinci en büyük star değerine sahip olan öğe: ", secondMaxStarItem);
      console.log("Üçüncü en büyük star değerine sahip olan öğe: ", thirdMaxStarItem);

      // Orijinal öğeyi seç
      var originalItem = document.querySelector("#proje");

      // Orijinal öğeyi sil
      originalItem.remove();

      // Birinci en büyük öğeyi ekle
      var cloneFirst = originalItem.cloneNode(true);
      cloneFirst.querySelector("#date").textContent = firstMaxStarItem.created_at.slice(0, 10);
      cloneFirst.querySelector("#projectName").textContent = firstMaxStarItem.name;
      cloneFirst.querySelector("#about").textContent = firstMaxStarItem.description;
      cloneFirst.querySelector("#button").addEventListener("click", function() {
        window.open(firstMaxStarItem.html_url);
      });
      document.querySelector("#projects").appendChild(cloneFirst);

      // İkinci en büyük öğeyi ekle
      var cloneSecond = originalItem.cloneNode(true);
      cloneSecond.querySelector("#date").textContent = secondMaxStarItem.created_at.slice(0, 10);
      cloneSecond.querySelector("#projectName").textContent = secondMaxStarItem.name;
      cloneSecond.querySelector("#about").textContent = secondMaxStarItem.description;
      cloneSecond.querySelector("#button").addEventListener("click", function() {
        window.open(secondMaxStarItem.html_url);
      });
      document.querySelector("#projects").appendChild(cloneSecond);

      // Üçüncü en büyük öğeyi ekle
      var cloneThird = originalItem.cloneNode(true);
      cloneThird.querySelector("#date").textContent = thirdMaxStarItem.created_at.slice(0, 10);
      cloneThird.querySelector("#projectName").textContent = thirdMaxStarItem.name;
      cloneThird.querySelector("#about").textContent = thirdMaxStarItem.description;
      cloneThird.querySelector("#button").addEventListener("click", function() {
        window.open(thirdMaxStarItem.html_url);
      });
      document.querySelector("#projects").appendChild(cloneThird);
    });
});

