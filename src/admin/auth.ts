import argon2 from "argon2"
import { User, UserRole } from "../entities/User"

export const authenticate = async (email: string, password: string) => {
    const user = await User.findOneBy({ email })
    if (
        user && 
        ( await argon2.verify(user.password, password) ) &&
        user.role.includes(UserRole.ADMIN)
    ) { 
        return user
    }
    return false
}