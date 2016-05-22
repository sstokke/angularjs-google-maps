var app = angular.module('myapp', ['ngMap']);
app.controller('LayerHeatmapCtrl', function(NgMap) {
  var heatmap, vm = this;
  NgMap.getMap().then(function(map) {
    vm.map = map;
    heatmap = vm.map.heatmapLayers.foo;
  });

  vm.toggleHeatmap= function(event) {
    heatmap.setMap(heatmap.getMap() ? null : vm.map);
  };

  vm.changeGradient = function() {
    var gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
  }

  vm.changeRadius = function() {
    heatmap.set('radius', heatmap.get('radius') ? null : 20);
  }

  vm.changeOpacity = function() {
    heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
  }

  vm.homeLat = 47.6062;
  vm.homeLong = 122.3321;


  vm.codeAddress = function(address) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': address }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        vm.homeLat = results[0].geometry.location.lat();
        vm.homeLong = results[0].geometry.location.lng();
      }
    });
  }
});
