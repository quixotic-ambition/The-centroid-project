  if(Meteor.isClient){

    Template.mainPage.events({

    "submit.mainForm":function(event){
        
        console.log("Enter the main form func ");
        event.preventDefault();
        var lat1=event.target['lat1'].value;
        var lon1=event.target.lon1.value;
        var lat2=event.target.lat2.value;
        var lon2=event.target.lon2.value;
        var lat3=event.target.lat3.value;
        var lon3=event.target.lon3.value;
        Session.set("solution",getCentroid(lat1,lon1,lat2,lon2,lat3,lon3));
    }, 


   });

    Template.mainPage.helpers({

      printSolution:function(){
        console.log("enteres print func "+ Session.get("solution"));
        if(Session.get("solution"))
        return Session.get("solution");
      },
      
    
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