// Create a timeline
// ====================
var tl = new TimelineMax(),
  tlMarker = new TimelineMax(),
  _path = MorphSVGPlugin.pathDataToBezier("#road-path-mobile path", {align: "#car-road-mobile"});

//
// ====================

// variable
// ====================

var _car = document.getElementById("car-road-mobile");

var _dataArrCoordinates = [],
  _idx = 1;

var _marker0 = document.getElementById("marker-mobile-0"),
  _marker1 = document.getElementById("marker-mobile-1"),
  _marker2 = document.getElementById("marker-mobile-2"),
  _marker3 = document.getElementById("marker-mobile-3"),
  _marker4 = document.getElementById("marker-mobile-4"),
  _marker5 = document.getElementById("marker-mobile-5"),
  _marker6 = document.getElementById("marker-mobile-6");

console.log(_marker0);
console.log(_marker1);
console.log(_marker2);
console.log(_marker3);
console.log(_marker4);
console.log(_marker5);
console.log(_marker6);
//
// ====================


// Main opt
// ====================
tl.set("#road-mobile-svg", {
  visibility: "visible"
});
tl.set(
  [
    _marker0, _marker1, _marker2, _marker3,
    _marker4, _marker5, _marker6
  ], {
    transformOrigin: 'center',
  }
);
tl.set(
  _car,
  {
    opacity: 0
  }
);
//
// ================


function detectObjectCoordinates(arrName) {
  arrName.forEach(function(val, idx) {
    _dataArrCoordinates.push(parseInt(document.getElementById(val).getBoundingClientRect().top));
  });

  return _dataArrCoordinates;
}
detectObjectCoordinates(["marker-mobile-0", "marker-mobile-1", "marker-mobile-2", "marker-mobile-3", "marker-mobile-4", "marker-mobile-5", "marker-mobile-6"]);

console.log(_dataArrCoordinates);

// Animate
// ====================

tl
  .to(_car, 0.25, {opacity: 1, ease: Power1.easeOut})
  .to(_marker0, 0.45, {opacity:1, scale: 1.25, ease: Power1.easeOut})
  .to(_marker0, 0.3, {scale: 1})
  .from(_car, 10, {
    bezier: {
      values:_path,
      type:"cubic",
      autoRotate: 90
    },
    onUpdate: function() {
      var _constOffset = 5,
        _carCoordinates = parseInt(_car.getBoundingClientRect().top);

      if ((_carCoordinates + _constOffset) >= (_dataArrCoordinates[_idx]) && (_dataArrCoordinates[_idx] <= (_carCoordinates + _constOffset))) {

        tlMarker
          .to(document.getElementById("marker-mobile-" + _idx), 0.45, {opacity:1, scale: 1.25, ease: Power1.easeOut})
          .to(document.getElementById("marker-mobile-" + _idx), 0.3, {scale: 1});

        _idx++
      }
    },
    ease: Power0.easeNone
  }, "+=0.5")
  .to(_car, 0.25, {opacity: 0, ease: Power1.easeOut});