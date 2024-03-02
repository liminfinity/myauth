
import { userDAL } from '../dal/userDAL';


class UserService {
     async getUsers() {
          const users = await userDAL.getUsers();
          if (!users) throw new Error(`Server error`)
          return users.map(user => ({userId: user.userid, ...user, userid: undefined}));
     }
}

const userService = new UserService();

export {userService}