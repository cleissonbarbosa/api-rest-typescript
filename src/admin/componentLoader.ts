import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
  Dashboard: componentLoader.add('Dashboard', '../components/dashboard'),
  CreateImages: componentLoader.add('CreateImages', '../components/pages/createImg')
}

export { componentLoader, Components }