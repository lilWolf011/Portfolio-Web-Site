let button = document.getElementById("button"); // html_url
let globalName = document.getElementById("globalName"); // textContent 
let username = document.getElementById("username"); // textContent 
let status = document.getElementById("discord_status"); // class içeriği değişicek
let activities = document.getElementById("activities")// if (!activities.length == 0) {activites e yaz};

let spotifyContainer = document.querySelector(".spotify");

// for döngüsü oluştur hem png hem jpg hem gif hepsini denesin

const projectTemplate = document.querySelector('#proje');
const projectContainer = document.getElementById('projects');

document.addEventListener("DOMContentLoaded", function() { 
  fetch("https://api.lanyard.rest/v1/users/535117705854844940")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    globalName.textContent = data.data.discord_user.global_name;
    username.textContent = data.data.discord_user.username;
    
    let durum;
    durum = data.data.discord_status;
    if (durum === "dnd") {
      status.classList.remove(status.classList[1]);
      status.classList.add("fa-circle-minus");
      status.style.color = "#f23f43";
      status.style.backgroundColor = "#131416";
    } else if (durum === "idle") {
      status.classList.remove(status.classList[1]);
      status.classList.add("fa-circle");
      status.style.color = "#f0b232";
    } else if (durum === "offline") {
      status.classList.remove(status.classList[1]);
      status.classList.add("fa-circle");
      status.style.color = "#7f838d";
    }

    let control;
    control = data.data.activities;
    if (!control.length == 0) {
      activities.textContent = data.data.activities[0].name;
      if (data.data.listening_to_spotify == true) {
        activities.textContent += " Listening."; 
        let url = document.getElementById("url");
        let album_art_url = document.getElementById("art_url");
        let song = document.getElementById("song")
        let artist = document.getElementById("artist");
        let album = document.getElementById("album");

        url.href = "https://open.spotify.com/track/"+data.data.spotify.track_id
        album_art_url.src = data.data.spotify.album_art_url;
        song.textContent = data.data.spotify.song;
        if (song.textContent.length > 20) {
          song.textContent = data.data.spotify.song.slice(0,20) + "...";
        }
        artist.textContent = data.data.spotify.artist;
        album.textContent = data.data.spotify.album;
        if (album.textContent.length > 27) {
          album.textContent = data.data.spotify.album.slice(0,27) + "...";
        }
        
        let startElement = document.getElementById("start");
        let endElement = document.getElementById("end");
        let progressElement = document.getElementById("progress");
        var startTimestamp = data.data.spotify.timestamps.start;
        var endTimestamp = data.data.spotify.timestamps.end;

        var diffMilliseconds = endTimestamp - startTimestamp;
        
        // Farkı saniyeye çevirme
        var diffSeconds = Math.floor(diffMilliseconds / 1000);
        
        // Toplam dakika hesaplama
        var diffMinutes = Math.floor(diffSeconds / 60);
        
        // Kalan saniyeyi hesaplama
        diffSeconds = diffSeconds % 60;
        
        let totalSeconds = diffMinutes * 60 + diffSeconds;
        let currentSeconds = 0;
        let i = 0;
        let j = 0;
        let diff = diffMinutes + ":" + (diffSeconds < 10 ? "0" + diffSeconds : diffSeconds);

        let interval = setInterval(() => { // zamanlayıcı oluyor
          startElement.textContent = i + ":" + (j < 10 ? "0" + j : j); // Değer atama
          j++; // Saniyeyi artır
          currentSeconds++;
        
          // İlerleme çubuğunu güncelle
          progressElement.value = (currentSeconds / totalSeconds) * 100;
        
          if (j >= 60) {
            j = 0; // Sıfırla
            i++; // Dakikayı artır
          }
        
          if (i > diffMinutes || (i === diffMinutes && j > diffSeconds)) {
            location.reload();
            clearInterval(interval); // Döngüyü durdur
          }
        
        }, 1000);
                       
        endElement.textContent = diff;
        
      } else {
        activities.textContent += " Playing."; 
      }

    } else if (control.length == 0) {
      spotifyContainer.remove();
    }
  }) 
  
  fetch("https://api.github.com/users/lilWolf011/repos?type=all")
    .then(response => response.json())
    .then(data => {
      // Verileri "star" değerine göre sırala
      data.sort((a, b) => b.stargazers_count - a.stargazers_count);

      var firstMaxStarItem = data[0];
      var secondMaxStarItem = data[1];
      var thirdMaxStarItem = data[2];

      // Orijinal öğeyi seç
      var originalItem = document.querySelector("#proje");

      // Orijinal öğeyi sil
      originalItem.remove();

      // Birinci en büyük öğeyi ekle
      var cloneFirst = originalItem.cloneNode(true);
      cloneFirst.querySelector("#date").textContent = "   " + firstMaxStarItem.created_at.slice(0, 10);
      cloneFirst.querySelector("#projectName").textContent = firstMaxStarItem.name;
      cloneFirst.querySelector("#about").textContent = firstMaxStarItem.description;
      cloneFirst.querySelector("#button").addEventListener("click", function() {
        window.open(firstMaxStarItem.html_url);
      });
      document.querySelector("#projects").appendChild(cloneFirst);

      // İkinci en büyük öğeyi ekle
      var cloneSecond = originalItem.cloneNode(true);
      cloneSecond.querySelector("#date").textContent = "   " + secondMaxStarItem.created_at.slice(0, 10);
      cloneSecond.querySelector("#projectName").textContent = secondMaxStarItem.name;
      cloneSecond.querySelector("#about").textContent = secondMaxStarItem.description;
      cloneSecond.querySelector("#button").addEventListener("click", function() {
        window.open(secondMaxStarItem.html_url);
      });
      document.querySelector("#projects").appendChild(cloneSecond);

      // Üçüncü en büyük öğeyi ekle
      var cloneThird = originalItem.cloneNode(true);
      cloneThird.querySelector("#date").textContent = "   " + thirdMaxStarItem.created_at.slice(0, 10);
      cloneThird.querySelector("#projectName").textContent = thirdMaxStarItem.name;
      cloneThird.querySelector("#about").textContent = thirdMaxStarItem.description;
      cloneThird.querySelector("#button").addEventListener("click", function() {
        window.open(thirdMaxStarItem.html_url);
      });
      document.querySelector("#projects").appendChild(cloneThird);
    });
});

