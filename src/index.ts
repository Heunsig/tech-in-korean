import express from 'express'

const app = express()

app.use(express.static('public'))
app.use(express.static('assets'))

// start express server and it should take PORT from environment variable
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
})