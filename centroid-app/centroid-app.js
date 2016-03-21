/*

$("[name=lat1]").val(12.917416);
$("[name=lon1]").val(77.622403);
$("[name=lat2]").val(12.860855);
$("[name=lon2]").val(77.662808);
$("[name=lat3]").val(12.964537);
$("[name=lon3]").val(77.717800);


*/

  if(Meteor.isClient){

    var friend1;
    var friend2;
    var friend3;
    Template.mainPage.events({

    "submit.mainForm":function(event){
        
        event.preventDefault();
        var lat1=event.target['lat1'].value;
        var lon1=event.target.lon1.value;
        var lat2=event.target.lat2.value;
        var lon2=event.target.lon2.value;
        var lat3=event.target.lat3.value;
        var lon3=event.target.lon3.value;
        friend1={lat:+lat1,lng:+lon1};
        friend2={lat:+lat2,lng:+lon2};
        friend3={lat:+lat3,lng:+lon3};
        console.log(friend3);
        Session.set("solution",getCentroid(lat1,lon1,lat2,lon2,lat3,lon3));
        GoogleMaps.load({ v: '3', libraries: 'geometry,places' });
    }, 


   });

    Template.mainPage.helpers({

      printSolution:function(){
        
        if(Session.get("solution"))
        return Session.get("solution");
      },
      exampleMapOptions: function() {
        var solution=Session.get("solution");
        // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
          // Map initialization options
          return {
            center: new google.maps.LatLng(solution[0],solution[1]),
            zoom: 11
          };
        }
      }
      
    
    });
    Template.mainPage.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
      GoogleMaps.ready('centMap', function(map) {
        // Add a marker to the map once it's ready
        console.log(map);
        var reqloc= Session.get("solution");
        var inMap={lat:reqloc[0],lng:reqloc[1]};
        var marker = new google.maps.Marker({
          position: inMap,
          map: map.instance
        });
        var marker1 = new google.maps.Marker({
          position: friend1,
          map: map.instance
        });
        var marker2 = new google.maps.Marker({
          position: friend2,
          map: map.instance
        });
        var marker3 = new google.maps.Marker({
          position: friend3,
          map: map.instance
        });


        var request = {
        location: inMap,
        radius: '500',
        types: ['cafe','bar']
        };


       var service = new google.maps.places.PlacesService(map.instance);
        service.nearbySearch(request, function(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          // If the request succeeds, draw the place location on
          // the map as a marker, and register an event to handle a
          // click on the marker.
          var marker = new google.maps.Marker({
            map: map.instance,
            position: place.geometry.location
            });
          }
        }
      }); 
    });

        
  });



    function getCentroid(lat1,lon1,lat2,lon2,lat3,lon3){

      console.log("enterred get centroid " + lat1);
      var cLat;
      var cLon;
      console.log(((+lat1) + (+lat2) + (+lat3))/3);
      cLat=((+lat1) + (+lat2) + (+lat3))/3;
      cLon=((+lon1) + (+lon2) + (+lon3))/3;
       console.log(cLat + " " + cLon);

      return [cLat,cLon];

    }

    //maybe for large diatances
    // function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    //   var R = 6371; // Radius of the earth in km
    //   var dLat = deg2rad(lat2-lat1);  // deg2rad below
    //   var dLon = deg2rad(lon2-lon1); 
    //   var a = 
    //     Math.sin(dLat/2) * Math.sin(dLat/2) +
    //     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    //     Math.sin(dLon/2) * Math.sin(dLon/2)
    //     ; 
    //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    //   var d = R * c; // Distance in km
    //   console.log(d);
    //   return d;
    // }

    // function deg2rad(deg) {

    //         return deg * (Math.PI/180)
    //       }



}