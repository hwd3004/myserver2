import prisma from "../../prisma";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (root: any, args: any, context: any, info: any) => {
      try {
        const {
          userId,
          userName,
          password,
          confirmPassword,
          email,
          confirmEmail,
        }: {
          userId: string;
          userName: string;
          password: string;
          confirmPassword: string;
          email: string;
          confirmEmail: string;
        } = args;

        if (password != confirmPassword) {
          return {
            result: false,
            error: "비밀번호 확인 필요",
          };
        }

        if (email != confirmEmail) {
          return {
            result: false,
            error: "이메일 확인 필요",
          };
        }

        const checkUserId = await prisma.user.findUnique({
          where: {
            userId,
          },
        });

        if (checkUserId) {
          return { result: false, error: "Id is already exists." };
        }

        const checkUserName = await prisma.user.findUnique({
          where: {
            userName,
          },
        });

        if (checkUserName) {
          return { result: false, error: "username is already exists." };
        }

        const checkEmail = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (checkEmail) {
          return { result: false, error: "email is already exists." };
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
          data: {
            userId,
            userName,
            password: hashPassword,
            email,
          },
        });

        return {
          result: true,
        };
      } catch (error) {
        return {
          result: false,
          // error: "can't create account.",
          error,
        };
      }
    },
  },
};
