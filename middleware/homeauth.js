module.exports = (req, res, next) => {
  try {
    const token = req.cookies['userId']
    if (token == null) {
      console.log('Not signed in!!')
      return res.status(401).json({
        message: 'Please Sign in or Sign Up' })
    }
    next()
  } catch (e) {
    console.error(e)
    res.status(500).send({ message: 'Please Sign in Again' })
  }
}
