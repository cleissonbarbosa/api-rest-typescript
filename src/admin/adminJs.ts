import passwordsFeature from "@adminjs/passwords";
import * as argon2 from "argon2";
import AdminJS from 'adminjs'
import { Database, Resource } from '@adminjs/prisma' // or any other adapter
import Login from "../components/login";
import importExportFeature from "@adminjs/import-export";
import { prisma } from "../prisma";
import { DMMFClass } from '@prisma/client/runtime'
const getAdminJs = () => {
    AdminJS.registerAdapter({ Database, Resource })

    const dmmf = ((prisma as any)._baseDmmf as DMMFClass)
    const adminJs = new AdminJS({
        resources: [
            {
                resource: { model: dmmf.modelMap.Users, client: prisma },
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
                resource: { model: dmmf.modelMap.Rooms, client: prisma },
                options: {
                    navigation: {
                        name: 'E-learning',
                        icon: 'Books'
                    },
                },
            },
            {
                resource: { model: dmmf.modelMap.Videos, client: prisma },
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
                resource: { model: dmmf.modelMap.Subjects, client: prisma },
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