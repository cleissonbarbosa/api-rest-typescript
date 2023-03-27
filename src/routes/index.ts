import makeRoutes from './make-routes';
import OpenAi from './openAi';
import school from './school';
import userRoutes from './user';

const routes = makeRoutes(
    userRoutes.userCreateRouter,
    OpenAi.createImage,
    school.room,
    school.subject
);
routes.get('/', (req, res) => res.redirect( '/admin' ) )

export default routes