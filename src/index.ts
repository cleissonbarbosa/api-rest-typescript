import 'express-async-errors'
import 'dotenv/config'
import express from 'express'
import routes from './routes'
import getAdminJs from './admin/adminJs';
import getAdminRouter from './admin/adminRouter';
import { error } from './middlewares/error';

const app = express()
const adminJs = getAdminJs()
const adminRouter = getAdminRouter( adminJs );

app.use(adminJs.options.rootPath, adminRouter)

app.use(express.json())
app.use(express.static('public'))

app.use(routes)

app.use( error ) // middleware of errors

app.listen(
	process.env.PORT, 
	() => {
		console.log(`AdminJS started on http://localhost:${process.env.PORT}${adminJs.options.rootPath}`)
	}
)
