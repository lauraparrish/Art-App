document
  .getElementById("artSubmit")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const value = document.getElementById("artInput").value;
    if (value === "") return;
    console.log(value);
    const url =
      "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q="+value;
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        let IDArray = [];
        for(let i =0; i<= json.total; i++){
          IDArray[i] =json.objectIDs[i];
        }
        let ID = IDArray[Math.floor(Math.random()*IDArray.length)];
        const url2= "https://collectionapi.metmuseum.org/public/collection/v1/objects/"+ ID;
        fetch(url2)
      .then(function (response) {
        return response.json();
      })
      .then(function (json){
        let results = "";
        let imageURL = "";
        results +=
         "Department: "+
        json.department +
        "<br>"+
        "Medium: "+
        json.medium+
        "<br>"+
        "Artist Name: "+
        json.artistDisplayName +
        "<br>"+
        "Date: "+ 
        json.objectDate;
        imageURL+=
        json.primaryImage;
        document.getElementById("artResults").innerHTML = results;
        document.getElementById("artURL").src= imageURL;
        });
        document.getElementById("artId").innerText= IDArray[0];
      })

    });

