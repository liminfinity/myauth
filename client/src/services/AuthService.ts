import { $api } from "../http";
import { LoginReq, SignUpReq } from "../types/request";
import { AuthResponse, RegResponse } from "../types/response";

export class AuthService {
    static async signUp(signUpData: SignUpReq) {
        const res = await $api.post<RegResponse>('/auth/signup', signUpData);
        const auth = res.data;
        localStorage.setItem('accessToken', auth.accessToken);
        return auth.email;
    }
    static async login(loginData: LoginReq) {
        const res = await $api.post<AuthResponse>('/auth/login', loginData);
        const auth = res.data;
        localStorage.setItem('accessToken', auth.accessToken);
        return auth.user;
    }
    static async logout() {
        const res = await $api.post<{deleted_token: string}>('/auth/logout');
        if (!res.data.deleted_token) throw new Error("Server error");
        localStorage.removeItem('accessToken');
    }
    static async refresh() {
        const res = await $api.get<AuthResponse>('/auth/refresh');
        const auth = res.data;
        localStorage.setItem('accessToken', auth.accessToken);
        return auth.user;
    }

}