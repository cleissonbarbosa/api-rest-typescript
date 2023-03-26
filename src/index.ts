import 'express-async-errors'
import express from 'express'
import { AppDataSource } from './data-source'
import routes from './routes'
import getAdminJs from './admin/adminJs';
import getAdminRouter from './admin/adminRouter';
import { error } from './middlewares/error';


AppDataSource.initialize().then(() => {
	const app = express()
	const adminJs = getAdminJs()
	const adminRouter = getAdminRouter( adminJs );

	app.use(adminJs.options.rootPath, adminRouter)
	
	app.use(express.json())

	app.use(routes)

	app.use( error ) // middleware of errors

	return app.listen(
		process.env.PORT, 
		() => {
			console.log(`AdminJS started on http://localhost:${process.env.PORT}${adminJs.options.rootPath}`)
		}
	)
})
