/* eslint-disable no-return-await */
const { Op } = require('sequelize');
const { Todo } = require('../../models');

module.exports = {
  Mutation: {
    async createTodo(root, args, context) {
      const { title } = args;

      return await Todo.create({ title, userId: context.user.id, isCompleted: false });
    },

    async updateTodo(root, input, context) {
      const { id, isCompleted } = input;
      const todo = await Todo.findOne({ where: { id } });

      if (!todo) {
        throw new Error('Item Notfound...');
      }
      const updated = await Todo.update({ isCompleted }, { where: { id } });
      const isSucceded = !!updated;

      return isSucceded;
    },

    async deleteTodo(root, input, context) {
      const { id } = input;
      const todo = await Todo.findOne({ where: { id } });

      if (!todo) {
        throw new Error('Item Notfound...');
      }
      const deleted = await Todo.destroy({ where: { id } });
      const isSucceded = !!deleted;

      return isSucceded;
    }
  },

  Query: {
    async listTodos(root, args, context) {
      const userId = context.user.id;
      const { isCompleted } = args;
      let query = { userId: { [Op.eq]: userId } };
      if (isCompleted !== undefined) {
        query = { userId: { [Op.eq]: userId }, isCompleted: { [Op.eq]: isCompleted } };
      }

      return await Todo.findAll({
        where: query,
        order: [
          ['id', 'DESC']]
      });
    },
  }
};
