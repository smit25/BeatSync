// var token = 'BQCPG-P9sjK-OGBfEeGOzQBU_2FcV3-lA9RivuzhpRa5nL9mFlm4z_dKrZTiuLsXtKKvNTVJ7E4D1IH6Goo5lYX6aVZmnxDtr7NTdHSVueIP0YInOu9YIHsEqnAsBi3Yiv3YE2xdc4wRS64UYL9_VLuF81ksovaYyPTvrepLGsDvFxdNgWk'

var track = ''
const limit = 5
var songList = []
function myFunc (urlTrack, token) {
  $.ajax({
    url: 'https://api.spotify.com/v1/search?q=' + urlTrack + '&type=track%2Cartist&limit=' + limit + '&offset=5',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    success: function (response) {
      console.log(response)
      handleTrackresponse(response)
    }
  })
}

var handleTrackresponse = (response) => {
  for (let i = 0; i < limit; i++) {
    const song = response.tracks.items[i]
    var songName = song.name
    var artistName = 'Unknown'
    var preview = song.uri
    var imageUrl = song.album.images[0].url
    if (song.artists.length > 0) {
      artistName = song.artists[0].name
    }
    songList[i] = {
      name: songName,
      artistName: artistName,
      uri: preview,
      image: imageUrl
    }
  }
  var searchItems = document.getElementById('searchItems')
  searchItems.innerHTML = ''
  for (let i = 0; i < limit; i++) {
    var searchData = document.createElement('search-item')
    searchData.innerHTML = layoutSongList(songList[i], i + 1)
    searchItems.appendChild(searchData)
  }
  $('.searchList').slideToggle()
}

var layoutSongList = function (songItem, id) {
  var htmlText = ''
  htmlText += `<select id="myselect"><option value = "${id}"> Song: ${songItem.name} || Artist: ${songItem.artistName} </option></select>`
  return htmlText
}

// On selecting the track
$("input[name='searchList']").on('input', function (e) {
  e.preventDefault()
  var selectedId = $(this).val()
  // console.log('selectedId: ' + selectedId)
  if (parseInt(selectedId) > 0 && parseInt(selectedId) < 6) {
    var selected = songList[selectedId - 1].uri
    var temp = selected.split(':')
    if (temp[0] == 'spotify') {
      track = selected
      let trackName = songList[selectedId - 1].name
      console.log('track url: ' + track)
      console.log('trackName: ' + trackName)
      document.getElementById('song-name').innerHTML = trackName
      // imageUrl
      let imageUrl = songList[selectedId - 1].image
      var x = document.getElementById("image0")
      x.setAttribute("src", imageUrl)
      console.log('imageURL: ' + imageUrl)
    }
  }
})

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
// extract token

const form = document.getElementById('searchForm')
console.log('token: ' + token)
form.addEventListener('submit', (evt) => {
  evt.preventDefault()
  let track = document.getElementById('search').value
  let urlTrack = refineSearch(track)
  myFunc(urlTrack, token)
})

function refineSearch (track) {
  console.log(track)
  let newTrack = track.split(' ').join('+')
  console.log(newTrack)
  return newTrack
}
