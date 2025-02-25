function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; 
  }
  
  function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; 
  }
  
  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var total_sqft = document.getElementById("uiSqft");
    var bedrooms = getBHKValue();
    var bath = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
   var url = "http://192.168.83.231:5001/predict_home_price"; 
    // var url = "/api/predict_home_price"; nginx.
    $.post(url, {
        total_sqft: parseFloat(total_sqft.value),
        bedrooms: bedrooms,
        bath: bath,
        location: location.value
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        console.log(status);
    });
  }
  
  function onPageLoad() {
    console.log( "document loaded" );
    var url = "http://192.168.83.231:5001/get_location_names"; 
  //  var url = "/api/get_location_names"; //nginx
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
  }
  
  window.onload = onPageLoad;
