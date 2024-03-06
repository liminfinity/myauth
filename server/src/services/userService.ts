
import { userDAL } from '../dal/userDAL';
import { tokenService } from './tokenService';


class UserService {
     async getUsers(refreshToken: string = '', query: string = '') {
          const user = tokenService.verifyRefreshToken(refreshToken);
          const users = await userDAL.getUsers(user?.userId, query);
          if (!users) throw new Error(`Server error`)
          return users.map(user => ({userId: user.userid, ...user, userid: undefined}));
     }
}

const userService = new UserService();

export {userService}