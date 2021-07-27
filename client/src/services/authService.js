import api from '../http/'

class AuthService {
    static async login(email, password) {
        return api.post('/users/login', {email, password})
    }

    static async registration(email, password) {
        return api.post('/users/registration', {email, password})
    }

    static async logout() {
        return api.post('/users/logout')
    }
}

export default AuthService