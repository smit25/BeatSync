function startplay() {;
  $.ajax({
    url: `https:/api.spotify.com/v1/me/player/play?device_id=20aeb59ea9b7bf3e98073536cf43c7ffb85fd9da`,
    type: 'PUT',
    // data: {
    //   "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
    //   "offset": {
    //       "position": 5
    //   },
    //   "position_ms": 0
    // },
    headers: {
      'Authorization': 'Bearer BQCCnu7cZIPXDgk-Tiuamr4TFckrRTvTdQ-z94qd-ycumO6tZH9w4FJcZayFwxWogKupvRoJycGsZlA0qBorbFq2g_sBaqSqsWT_oA-hh9Py254YoeOt3EOAIPptrnd0su2Zin1ZEsdW8BtTwfIMpxkolOhYPE8K_-qVWm0grc6nMBQQ',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    success: function (response) {
      console.log('Play/Start Request made')
      console.log(response)
    }
  })
}
function pause() {
  $.ajax({
    url: `https://api.spotify.com/v1/me/player/pause?device_id=20aeb59ea9b7bf3e98073536cf43c7ffb85fd9da`,
    type: 'PUT',
    headers: {
      'Authorization': 'Bearer BQCCnu7cZIPXDgk-Tiuamr4TFckrRTvTdQ-z94qd-ycumO6tZH9w4FJcZayFwxWogKupvRoJycGsZlA0qBorbFq2g_sBaqSqsWT_oA-hh9Py254YoeOt3EOAIPptrnd0su2Zin1ZEsdW8BtTwfIMpxkolOhYPE8K_-qVWm0grc6nMBQQ',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    success: function (response) {
      console.log('Pause Request made!')
      console.log(response)
    }
  })
}