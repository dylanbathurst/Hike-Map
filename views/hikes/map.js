function(doc) {
  emit('hike', {
    'title': doc.name,
    'distance': doc.distance,
    'elevation': doc.elevation,
    'description': doc.description,
    'lat': doc.lat,
    'lng': doc.lng
  });
}