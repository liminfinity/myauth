export interface User {
    userId?: string,
    email: string,
    password: string,
    username: string
}

export interface UserActivationInfo {
    user: User, 
    isActivated: boolean,
    activationId: string
}




