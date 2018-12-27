import { ApolloError } from 'apollo-server-express';
import { StudentModel } from 'src/models/StudentModel';
import { comparePasswords, hashPassword, signJWT } from 'src/utils';

const queries = {
  student: async (_root, _args) => {
    const student = await StudentModel.findById(_args.id);
    return student;
  },
  me: async (_root, _args, _ctx) => {
    const user = await StudentModel.findById(_ctx.user.id);
    return user;
  },
};

const mutations = {
  register: async (_role, _args, _ctx) => {
    if (!_args.password) {
      throw new ApolloError('Password is needed', 'PASSWORD_NEEDED');
    }

    const student = await StudentModel.findOne({ studentId: _args.studentId });

    if (student) {
      throw new ApolloError(
        'User with this studentId already exists! Please enter another one!',
        'USER_ALREADY_EXISTS'
      );
    }
    const payload = {
      ..._args,
    };
    payload.password = await hashPassword(_args.password);
    const newUser = await StudentModel.create(payload);
    const jwt = await signJWT(newUser);
    return { jwt };
  },

  login: async (_root, _args) => {
    const { studentId, password } = _args;
    const student = await StudentModel.findOne({ studentId });
    if (!student) {
      throw new ApolloError('Student ID is incorrect!', 'STUDENT_ID_INCORRECT');
    }

    const validPassword = await comparePasswords(password, student.password);

    if (!validPassword) {
      throw new ApolloError('Password is incorrect!', 'PASSWORD_INCORRECT');
    }

    const jwt = await signJWT(student);

    return { jwt };
  },
};

const studentResolvers = {
  mutations,
  queries,
};

export default studentResolvers;
