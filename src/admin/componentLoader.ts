import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
  Dashboard: componentLoader.add('Dashboard', '../components/dashboard'),
  CreateImages: componentLoader.add('CreateImages', '../components/pages/createImg'),
  Settings: componentLoader.add('Settings', '../components/pages/settings')
}

export { componentLoader as default, Components }