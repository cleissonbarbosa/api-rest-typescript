import passwordsFeature from "@adminjs/passwords";
import * as argon2 from "argon2";
import { Subject, Room, User, Video } from "../entities";
import AdminJS from 'adminjs'
import { Database, Resource } from '@adminjs/typeorm' // or any other adapter
import Login from "../components/login";
import importExportFeature from "@adminjs/import-export";

const getAdminJs = () => {
    AdminJS.registerAdapter({ Database, Resource })

    const adminJs = new AdminJS({
        resources: [
            {
                resource: User,
                options: {
                    navigation: {
                        name: 'Users',
                        icon: 'User'
                    },
                    properties: {
                        password: {
                            isVisible: false,
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
                options: {
                    navigation: {
                        name: 'E-learning',
                        icon: 'Books'
                    },
                },
            },
            {
                resource: Video,
                options: {
                    navigation: {
                        name: 'E-learning',
                        icon: 'Books'
                    },
                },
                features: [
                    importExportFeature()
                ]
            },
            {
                resource: Subject,
                options: {
                    navigation: {
                        name: 'E-learning',
                        icon: 'Books'
                    },
                },
            },
        ],
        branding: {
            companyName: 'Cleisson B.',
            logo: 'https://99freelas.s3-sa-east-1.amazonaws.com/profile/66x66/cleisson-barbosa.jpg?m=1',
            favicon: 'https://99freelas.s3-sa-east-1.amazonaws.com/profile/66x66/cleisson-barbosa.jpg?m=1',
        },
        locale: {
            language: 'pt-BR',
            translations: {
                messages: {
                    forgotPasswordQuestion: "Esqueceu a senha?",
                    forgotPassword: "clique aqui",
                    loginWelcome: "Painel admin para gerenciar recursos de uma API Rest"
                },
                labels: {
                    // here we translate the name of a resource.
                    Room: 'Sala de aula',
                    Subject: "Materia",
                    User: "Usuários",
                },
                properties: {
                    email: "E-mail",
                    password: "Senha"
                }
            }
        }
    })

    adminJs.overrideLogin({ component: Login })

    return adminJs;
}
export default getAdminJs;