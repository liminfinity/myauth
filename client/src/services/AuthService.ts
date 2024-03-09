import axios, { AxiosResponse } from "axios";
import { $api, API_URL } from "../http";
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
        const user = await this.getUser(res);
        return user;
    }
    static async logout() {
        await $api.post<{deleted_token: string}>('/auth/logout');
        localStorage.removeItem('accessToken');
    }
    static async deleteAccount(userId: string) {
        const res = await $api.delete<{isDeleted: boolean}>('/auth/delete-account', {
            params: {
                userId
            }
        });
        localStorage.removeItem('accessToken');
        return res.data.isDeleted;
    }
    static async refresh() {
        const res = await $api.get<AuthResponse>('/auth/refresh');
        const user = await this.getUser(res);
        return user;
    }
    static async checkAuth() {
        const res = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true});
        const user = await this.getUser(res);
        return user;        
    }
    public static async getUser(response: AxiosResponse<AuthResponse>) {
        const auth = response.data;
        localStorage.setItem('accessToken', auth.accessToken);
        return auth.user;
    }

}