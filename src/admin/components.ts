import AdminJS from 'adminjs';

const BASE = './../components/';
const bundle = (path, componentName) => AdminJS.bundle(`${BASE}/${path}`, componentName);

export const CreateImages = bundle('pages/createImg', 'CreateImages');
export const Dashboard = bundle('dashboard', 'Dashboard');