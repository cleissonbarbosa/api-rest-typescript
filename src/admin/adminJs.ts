import AdminJS from 'adminjs'
import { Database, Resource } from '@adminjs/prisma' // or any other adapter
import Login from "../components/login";
import { getAdminResources } from "./resources";
import { componentLoader, Components } from './componentLoader'
import { dashboardHandler } from './dashboard/handle';

const getAdminJs = () => {
    AdminJS.registerAdapter({ Database, Resource })
    const adminJs = new AdminJS({
        resources: getAdminResources(),
        componentLoader,
        dashboard: {
            component: Components.Dashboard,
            handler: dashboardHandler
        },
        pages: {
            "create Images": {
                icon: "Users",
                component: Components.CreateImages,
            }
        },
        branding: {
            companyName: 'Cleisson B.',
            logo: '/images/logo.png',
            favicon: '/images/logo.png',
            theme: {
                colors: {
                    primary100: "#000003",
                    infoDark: "#000003",
                    hoverBg: "#00692f",
                    info: "#00692f",
                    primary60: "#00692f",
                    infoLight: "#00f83b",
                    primary20: "#00f83b",
                    grey100: "#003f1f"
                }
            }
        },
        version: {
            app: "1.0.0",
            admin: true
        },
        locale: {
            language: 'pt-BR',
            translations: {
                messages: {
                    forgotPasswordQuestion: "Esqueceu a senha?",
                    forgotPassword: "clique aqui",
                    loginWelcome: "Painel admin para gerenciar recursos de uma API Rest",
                    users_title: "Usuários",
                    users_subtitle: "Veja a lista de usuários cadastrados, edite ou remova.",
                    Github_title: "Api Rest Node.js Repo",
                    Github_subtitle: "Rest API with NodeJS + Typescript + Prisma + OpenAi integration"
                },
                labels: {
                    // here we translate the name of a resource.
                    Room: 'Sala de aula',
                    Subject: "Materia",
                    User: "Usuários",
                    createImages: "etste"
                },
                properties: {
                    email: "E-mail",
                    password: "Senha",
                    createImages: "etste"
                },
            }
        }
    })

    adminJs.overrideLogin({ component: Login })
    adminJs.watch()
    return adminJs;
}
export default getAdminJs;