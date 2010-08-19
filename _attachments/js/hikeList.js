$(document).ready(function(){
  // Crockford Fix for Object.create. http://javascript.crockford.com/prototypal.html
  if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
  }
  var m = Object.create(map);
  m.initializer('map_canvas');
  m.displayHikes();
});

var map = {
  initializer: function(canvas){
    this.startCoords = new google.maps.LatLng(36.175, -115.136389);
    this.defaults = {
      zoom: 3,
      center: this.startCoords,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.mapCanvas = new google.maps.Map(document.getElementById(canvas), this.defaults);
  },
  displayHikes: function(){
    var self = this;
    var hikeList = [];
    db.view('hike/hikes', {
      success: function(data) {
        var len = data.rows.length;
        for (var i = 0; i < len; i++) {
          var value = data.rows[i].value;
          var lat = value.lat;
          var lng = value.lng;
          var name = value.title;
          var distance = value.distance;
          var elevation = value.elevation;
          var description = value.description;
          var myLatLng = new google.maps.LatLng(lat, lng);
          var contentString = ['<h1>', name, '</h1><ul><li>', lat, ' / ', lng, '</li><li>', elevation, ' ft.</li><li>', distance, ' mi.</li></ul><p>',description, '</p>'];
          self.createMarker(i, myLatLng, contentString);
        }
      }
    });
  },
  createMarker: function(index, coords, content){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.mapCanvas,
      icon: this.image,
      shadow: this.shadow,
      shape: this.shape,
      value: index
    });
    google.maps.event.addListener(marker, 'click', function() {
      $('#trailInfo').html(content.join(''));
    });
  },
  image: new google.maps.MarkerImage(
    'http://a3.twimg.com/profile_images/686858673/4324110983_2e16c4aa79_normal.jpeg', 
    new google.maps.Size(30, 30), 
    new google.maps.Point(0, 0), 
    new google.maps.Point(0, 32)
  ),
  shadow: new google.maps.MarkerImage(
    'imgs/shadow.png', 
    new google.maps.Size(52, 48), 
    new google.maps.Point(0, 0), 
    new google.maps.Point(11, 41)
  ),
  shape: {
    coord: [1, 1, 50, 50], 
    type: 'rect'
  }
};
