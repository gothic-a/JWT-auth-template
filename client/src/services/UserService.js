import api from '../http/'

class UserService {
    static async fetchUsers() {
        return api.get('/users')
    }
}

export default UserService