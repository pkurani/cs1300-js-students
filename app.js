var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=Ntqif5UsHBlMXL8cxHYDVv88g2_Ns7FOFCUTvdBNGSQ";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!

function myFunction(item, index) {
  document.getElementById("genus").innerHTML += index+1 + ":" + item.common_name + "<br>";
}

function renderRandomPlant() {
  corsPromise().then(
    (request) =>
      (request.onload = request.onerror = function () {
        const response = request.response;
        const data = JSON.parse(response).data;
        const randomElement = Math.floor(Math.random() * data.length);
        document.getElementById('tester').innerHTML = data[randomElement].common_name
        document.getElementById("plantImg").src = data[randomElement].image_url;
        var genusArr = data.filter(function(plant){ //filter function used here!
            return plant.genus === data[randomElement].genus;
        });
        document.getElementById("genus").innerHTML = "";
        genusArr.forEach(myFunction);

      })
  );

}
