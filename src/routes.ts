import { Router } from 'express'
import { IAController } from './controllers/IAController'
import { RoomController } from './controllers/RoomController'
import { SubjectController } from './controllers/SubjectController'
import { UserController } from './controllers/UserController'

const routes = Router()

routes.get('/', (req, res) => res.redirect( '/admin' ) )
routes.post('/create-img', new IAController().createIMG)
routes.post('/user', new UserController().create)
routes.post('/subject', new SubjectController().create)
routes.post('/room', new RoomController().create)
routes.get('/room', new RoomController().list)
routes.post('/room/:idRoom/create', new RoomController().createVideo)
routes.post('/room/:idRoom/subject', new RoomController().roomSubject)
export default routes
