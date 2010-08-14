$(document).ready(function(){
  catchSubmittedForm();
});

function catchSubmittedForm() {
  $('#hikeForm').submit(function(e){
    e.preventDefault();
    var hName = $('#name').val();
    var hLat = $('#lat').val();
    var hLng = $('#lng').val();
    var hElevation = $('#elevation').val();
    var hDistance = $('#distance').val();
    var hDescription = $('#description').val();
    
    $.couch.db('hike').saveDoc(
      {
        name: hName,
        lat: hLat,
        lng: hLng,
        elevation: hElevation,
        distance: hDistance,
        description: hDescription
      },
      {
        success: function(){
          alert('Saved Gud!');
          displayHikes();
        }
      }
    );
  });
}
