import prisma from "../prisma";
import bcrypt from "bcrypt";

export default {
  Query: {
    users: async () => {
      try {
        const many = await prisma.user.findMany();

        return many;
      } catch (error) {
        return error;
      }
    },
  },
};
