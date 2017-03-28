var zoom = 12; // 18 for mobile phones because the geolocation is more accurate 
       
       function init() {
         // Don't bother if the web browser doesn't support cross-document messaging
         if (window.postMessage) {
           if (navigator && navigator.geolocation) {
             try {
               navigator.geolocation.getCurrentPosition(function(pPos) {
               send(pPos.coords.latitude, pPos.coords.longitude);
             }, function() {});
             } catch (e) {}
           } else if (google && google.gears) {
             // Relevant if targeting mobile phones (some of which may have Google Gears)
             try {
               var geoloc = google.gears.factory.create("beta.geolocation");
               geoloc.getCurrentPosition(function(pPos) {
               send(pPos.latitude, pPos.longitude);
             }, function() {});
             } catch (e) {}
           }
         }
       }

       function send(pLat, pLng) {
         var myiframe = document.getElementById("myiframe").contentWindow;
         // The third parameter, zoom, is optional
         myiframe.postMessage(pLat + "," + pLng + "," + zoom, "http://qib.la");
       }
       
       window.onload=init;