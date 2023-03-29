import passwordsFeature from "@adminjs/passwords";
import { DMMFClass } from "@prisma/client/runtime";
import { prisma } from "../prisma";
import * as argon2 from "argon2";
import importExportFeature from "@adminjs/import-export";

export function getAdminResources() : Array<any> {
    const dmmf = ((prisma as any)._baseDmmf as DMMFClass)
    return [
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
                    icon: 'Education'
                },
            },
        },
        {
            resource: { model: dmmf.modelMap.Videos, client: prisma },
            options: {
                navigation: {
                    name: 'E-learning',
                    icon: 'Education'
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
                    icon: 'Education'
                },
            },
        },
    ];
}