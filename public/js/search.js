const limit = 5
var songList = []
function myFunc (urlTrack, token) {
  $.ajax({
    url: 'https://api.spotify.com/v1/search?q=' + urlTrack + '&type=track%2Cartist&limit=' + limit + '&offset=5',
    headers: {
      'Authorization': 'Bearer BQADcTQFYrkN6_FrCO9ng4zuWtdwFNzLQpIgRuynXVfs3AfUdcAD3EkUYnPZNaP8SvMdwTs_6-G2nhKT2g-F0eJOZYWNvF-__rafJWd3Q8Mp0ZFtssW7_V743dU-5Mg3hxJIKUyZApoFzocXF5odM3AVbkrCr0efLBrwdYlVbGCSw5LL',
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
  for (let i = 0; i < limit; i++) {
    const song = response.tracks.items[i]
    var songName = song.name
    var artistName = 'Unknown'
    var preview = song.href
    if (song.artists.length > 0) {
      artistName = song.artists[0].name
    }
    songList[i] = {
      name: songName,
      artistName: artistName,
      url: preview
    }
  }
  var searchItems = document.getElementById('searchItems')
  searchItems.innerHTML = ''
  for (let i = 0; i < limit; i++) {
    var searchData = document.createElement('search-item')
    searchData.innerHTML = layoutSongList(songList[i])
    searchItems.appendChild(searchData)
  }
}

var layoutSongList = function (songItem) {
  var htmlText = ''
  /* var imgUrl = 'http://dudespaper.com/wp-content/uploads/2008/12/lebowskirecordalbum1.jpg'
    if (cur.album.images.length > 0) {
      imgUrl = cur.album.images[0].url
    } */
  htmlText += `<option value = "${songItem.url}"> Song: ${songItem.name} Artist: ${songItem.artistName} </option>`
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
