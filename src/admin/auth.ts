import { UsersRoleEnum } from "@prisma/client"
import * as argon2 from "argon2"
import { prisma } from "../prisma"

export const authenticate = async (email: string, password: string) => {
    const user = await prisma.users.findUnique({ where: { email } })
    if (
        user && 
        ( await argon2.verify(user.password, password) ) &&
        user.role.includes(UsersRoleEnum.administrator)
    ) { 
        return user
    }
    return false
}