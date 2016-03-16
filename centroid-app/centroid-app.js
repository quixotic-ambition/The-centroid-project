  if(Meteor.isClient){

    var calculateClick=function(){
      
      console.log("entered calculate click");
      var lat1=document.getElementById("lat1");
      var lon1=document.getElementById("lon1");
      var lat2=document.getElementById("lat2");
      var lon2=document.getElementById("lon2");
      console.log(lat1);
    }


    var getDistanceFromLatLonInKm=function(lat1,lon1,lat2,lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      console.log(d);
      console.log(lat1);
      return d;
    }

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }


    document.getElementById("calculate-butt").addEventListener("click",calculateClick);

    var solution=getDistanceFromLatLonInKm;
    console.log("distance should be : " + solution);

    document.getElementById("solution").value=solution;

}