function myFunc (urlTrack, token) {
  $.ajax({
    url: 'https://api.spotify.com/v1/search?q=' + urlTrack + '&type=track%2Cartist&limit=3&offset=5',
    headers: {
      'Authorization': 'Bearer BQChUsXy1-A4sxIT3EcteHIB71xEeT5OWUKc-RsXsMOqTyqi9qvxUneD6D9RHf4KGRSuVz65VpKgoQ7bZk7aQTcfifyMZM0cvE06-l3vQMy6arU-EOswmmakK3BcCsn6ATe1iSnbaErnwUZfhJv_gWJEc7En5UZwggrgJ-6Acst_pDr8',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    success: function (response) {
      console.log(response)
      for (var key = 0; key < 3; key++) {
        var searchData = document.createElement('search-item')
        searchData.innerHTML = `<option value = "${response.tracks.items[key].name}">`
        document.getElementById('searchItems').appendChild(searchData.firstChild)
      }
    }
  })
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
