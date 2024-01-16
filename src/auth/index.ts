import { getUserByEmail } from "../db/models/user";
import { check_password } from "./hashers/hash";

export const authenticate = async (email: string, password: string) => {
    const user = await getUserByEmail(email);
    if (!user) {
        return null;
    }
    if (check_password(password, user.authentication?.password!, user.authentication?.salt!)) {
        return user;
    }
    return null;
}