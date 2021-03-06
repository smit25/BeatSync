
module.exports = (req, res, next) => {
  try {
    const token = req.cookies['spotify_token']
    if (token == null) {
      console.log('Error in spotify authentication')
      return res.status(401).json({
        message: 'Authentiction with Spotify needed' })
    }
    next()
  } catch (e) {
    console.error(e)
    res.status(500).send({ message: 'Please Sign in Again' })
  }
}
