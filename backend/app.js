const express=require('express')
const cors=require('cors')

const app= express()
const port=3000

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(cors())
app.use(express.static('public'))

const resorRoutes = require('./routes/resorRoutes')

const bokningarRoutes = require('./routes/bokningarRoutes')

app.use(resorRoutes)

app.use(bokningarRoutes)

app.listen(port,()=>console.log(`Example listening on port ${port}`))
