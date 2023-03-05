import passwordsFeature from "@adminjs/passwords";
import argon2 from "argon2";
import { Subject, Room, User, Video } from "../entities";
import AdminJS from 'adminjs'
import { Database, Resource } from '@adminjs/typeorm' // or any other adapter
import Login from "../components/login";

const getAdminJs = () => {
    AdminJS.registerAdapter({ Database, Resource })

    const adminJs = new AdminJS({
        resources: [ 
            {
                resource: User,
                options: {
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
            Room,
            Video,
            Subject,
        ],
        branding: {
            companyName: 'Cleisson B.',
            logo: 'https://99freelas.s3-sa-east-1.amazonaws.com/profile/66x66/cleisson-barbosa.jpg?m=1',
            favicon: 'https://99freelas.s3-sa-east-1.amazonaws.com/profile/66x66/cleisson-barbosa.jpg?m=1',
        },
        locale: {
            language: 'pt-BR',
            translations: {
              labels: {
                // here we translate the name of a resource.
                Room: 'Sala de aula',
                Subject: "Materia",
                User: "Usuários"
              },
            }
        }
    })

    adminJs.overrideLogin({ component: Login })

    return adminJs;
}
export default getAdminJs;