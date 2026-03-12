
import { SignJWT, jwtVerify } from "jose";
import { hash, compare } from "bcryptjs";
import { cookies } from "next/headers";

const SECRET_KEY = new TextEncoder().encode(
    process.env.JWT_SECRET || "default-secret-key-change-it"
);

export async function hashPassword(password: string) {
    return await hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
    return await compare(password, hash);
}

export async function createSession(payload: any) {
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(SECRET_KEY);

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
        path: "/",
    });

    return token;
}

export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload;
    } catch (error) {
        return null;
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}
