export async function getVideoLabel(video, extenstion) {
  var url = `http://localhost:5000/getlabel/${video}/${extenstion}`;
    var receivedData = {};
  fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
      receivedData = data;
    });

  return receivedData;
}
