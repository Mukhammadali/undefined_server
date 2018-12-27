import { ApolloError } from 'apollo-server-express';
import { UserModel } from 'src/models/UserModel';
import { comparePasswords, hashPassword, signJWT } from 'src/utils';

const queries = {
  user: async (_root, _args) => {
    const user = await UserModel.findById(_args.id);
    return user;
  },
  me: async (_root, _args, _ctx) => {
    const user = await UserModel.findById(_ctx.user.id);
    return user;
  },
};

const mutations = {
  register: async (_role, _args) => {
    if (!_args.password) {
      throw new ApolloError('Password is needed', 'PASSWORD_NEEDED');
    }

    const user = await UserModel.findOne({ userId: _args.userId });

    if (user) {
      throw new ApolloError(
        'User with this userId already exists! Please enter another one!',
        'USER_ALREADY_EXISTS'
      );
    }
    const payload = {
      ..._args,
    };
    payload.password = await hashPassword(_args.password);
    const newUser = await UserModel.create(payload);
    const jwt = await signJWT(newUser);
    return { jwt };
  },

  login: async (_root, _args) => {
    const { userId, password } = _args;
    const user = await UserModel.findOne({ userId });
    if (!user) {
      throw new ApolloError('user ID is incorrect!', 'user_ID_INCORRECT');
    }

    const validPassword = await comparePasswords(password, user.password);

    if (!validPassword) {
      throw new ApolloError('Password is incorrect!', 'PASSWORD_INCORRECT');
    }

    const jwt = await signJWT(user);

    return { jwt };
  },
};

const userResolvers = {
  mutations,
  queries,
};

export default userResolvers;
