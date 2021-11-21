export interface AuthResponse {
    user: {
        id: number,
        username: string,
        password: string,
        email: string,
        role: number,
        imageUrl: string,
        access_token: string,
        expires_in: number
    }
}
