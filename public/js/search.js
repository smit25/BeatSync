const limit = 5
var songList = []
function myFunc (urlTrack, token) {
  $.ajax({
    url: 'https://api.spotify.com/v1/search?q=' + urlTrack + '&type=track%2Cartist&limit=' + limit + '&offset=5',
    headers: {
      'Authorization': 'Bearer BQD8tPKEpawfkWh3KdMP4ID1i1idgO4a-xWzEsCqaQSOcZDw9FQWNY8-NnxZwDdyUn8Cc07Xw7HVDP7V4pH7wmix8pREA_6yuwTF7ZTk53FBnS0dpjebF4nt5zspOTw8HA8ERym22um98ariLDn-DABQGkzO7eRLoYVM12RMLiW1FxTe',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    success: function (response) {
      console.log(response)
      handleTrackresponse(response)
      /* var searchItems = document.getElementById('searchItems')
      searchItems.innerHTML = ''
      for (var key = 0; key < 5; key++) {
        var searchData = document.createElement('search-item')
        searchData.innerHTML = `<option value = "${response.tracks.items[key].name}">`
        document.getElementById('searchItems').appendChild(searchData.firstChild)
      }
      */
    }
  })
}

var handleTrackresponse = (response) => {
  const song = response.tracks.items
  for (let i = 0; i < limit; i++) {
    songList[i] = {
      name: song[i],
      artistName = (song[i].artists.length > 0?song[i].artists[0].name: 'Unknown')
    }
  }
  var searchItems = document.getElementById('searchItems')
  searchItems.innerHTML = ''
  for (let i = 0; i < limit; i++) {
    var searchData = document.createElement('search-item')
    searchData.innerHTML = layoutSongList(response.tracks.items[i])
  }
}

var layoutSongList = function (songItem) {
  var htmlText = ''
  var cur = songItem
  var songName = cur.name
  var artistName = 'Unknown'
  if (cur.artists.length > 0) {
    artistName = cur.artists[0].name
  }
  /* var imgUrl = 'http://dudespaper.com/wp-content/uploads/2008/12/lebowskirecordalbum1.jpg'
    if (cur.album.images.length > 0) {
      imgUrl = cur.album.images[0].url
    } */
  var preview = cur.preview_url
  htmlText += '<option class="col-sm-12 text-center cover songList" data-preview="' + preview + '"><h4>' + songName + '<small><br>' + artistName + '</small></h4></div>'
  return htmlText
}
function refine (track) {
  console.log(track)
  let newTrack = track.split(' ').join('+')
  console.log(newTrack)
  return newTrack
}
var cookie = document.cookie
function getCookiesMap (cookiesString) {
  return cookiesString.split(';')
    .map((cookieString) => {
      return cookieString.trim().split('=')
    })
    .reduce((acc, curr) => {
      acc[curr[0]] = curr[1]
      return acc
    }, {})
}
var cookies = getCookiesMap(cookie)
var token = cookies['spotify_token']

const form = document.getElementById('searchForm')
console.log('token: ' + token)
document.getElementById('search').addEventListener('input', (evt) => {
  evt.preventDefault()
  let track = evt.target.value
  let urlTrack = refine(track)
  myFunc(urlTrack, token)
})
// Add Form.onsubmit
