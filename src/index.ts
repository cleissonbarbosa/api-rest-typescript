import express from 'express'
import { AppDataSource } from './data-source'
import routes from './routes'
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { Database, Resource } from '@adminjs/typeorm' // or any other adapter
import { Room } from './entities/Room'
import { Subject } from './entities/Subject'
import { Video } from './entities/Video'
import { User, UserRole } from './entities/User'
import Login from './components/login'
import passwordsFeature from '@adminjs/passwords'
import argon2 from 'argon2';



AppDataSource.initialize().then(() => {
	AdminJS.registerAdapter({ Database, Resource })

	const ADMIN_SECRET = process.env.ADMIN_SECRET || 's3cr3t4dmlnp4$$'

	const authenticate = async (email: string, password) => {
		const user = await User.findOneBy({ email })
		if (user) { 
			const matched = await argon2.verify(user.password, password)
			if (matched && user.role.includes(UserRole.ADMIN)) {
			  	return user
			}
		}
		return false
	}

	const adminJs = new AdminJS({
		resources: [ 
			{
				resource: User,
				options: {
					properties: {
					  password: {
						isVisible: {
						  list: false,
						  filter: false,
						  show: false,
						  edit: false, // we only show it in the edit view
						},
					  },
					},
				},
				features: [
					passwordsFeature({
					  properties: {
						encryptedPassword: 'password',
						password: 'newPassword'
					  },
					  hash: argon2.hash,
				  })
				]
			},
			{
				resource: Room,
				options: { // or you can provide an object with your custom resource options
				  id: 'sala_de_aula',
				},
			},
			Video,
			{
				resource: Subject,
				options: { // or you can provide an object with your custom resource options
					id: 'assunto', // here the resource identifier has been renamed to "class"
				},
			},
		  ],
	})
	adminJs.overrideLogin({ component: Login })
	const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
		adminJs,
		{
			authenticate,
			cookiePassword: ADMIN_SECRET,
		},
		null,
		{
		  resave: true,
		  saveUninitialized: true,
		  ADMIN_SECRET,
		},
	)
	
	const app = express()


	app.use(adminJs.options.rootPath, adminRouter)
	
	app.use(express.json())

	app.use(routes)

	return app.listen(
		process.env.PORT, 
		() => {
			console.log(`AdminJS started on http://localhost:${process.env.PORT}${adminJs.options.rootPath}`)
		}
	)
})
