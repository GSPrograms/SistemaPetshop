import express  from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from '../backend/Routes/authroutes.js'
import rotas from './Routes/routes.js'


dotenv.config()
const app = express()
const port = process.env.PORT || 3000


app.use(cors())
app.use(express.json())
app.use("/api", rotas)
app.use("/api", routes)


app.use('/uploads', express.static('uploads'))
app.use(express.static('public'))


app.listen(port, ()=> {
    console.log(`Servidor rodando em: http://localhost:${port}`)
})


const router = express.Router()
export default router
//para conectar o nodemon usar:
//npx nodemon server.js 