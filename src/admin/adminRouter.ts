import AdminJSExpress from '@adminjs/express'
import { authenticate } from './auth'

const getAdminRouter = ( adminJs ) => {
    const ADMIN_SECRET = process.env.ADMIN_SECRET || 's3cr3t4dmlnp4$$'
    
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

    return adminRouter
}

export default getAdminRouter