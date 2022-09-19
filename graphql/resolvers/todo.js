const { Todo, User } = require('../../models');
const { Op } = require("sequelize");

module.exports = {
  Mutation: {
    async createTodo(root, args, context) {
      const { title } = args;

      return await Todo.create({ title: title, userId: context.user.id, isCompleted: false });
    },

    async updateTodo(root, input , context) {
      const { id, isCompleted } = input;
      let todo = await Todo.findOne({ where: { id } });

      if (!todo) {
        throw new Error('Item Notfound...');
      }
      var updated =  await Todo.update({isCompleted: true}, { where:{ id } });
      var isSucceded = updated ? true : false;
      
      return isSucceded;
    },

    async deleteTodo(root, input , context) {

      const { id } = input;
      const todo = await Todo.findOne({ where: { id } });

      if (!todo) {
        throw new Error('Item Notfound...');
      }
      var deleted =  await Todo.destroy({ where:{ id } });
      var isSucceded = deleted ? true : false;

      return isSucceded;
    }
  },

  Query : {
    async listTodos(root, args, context) {
      const { userId, isCompleted } = args;
      var query = { userId: { [Op.eq] : userId }};
      if (isCompleted !== undefined) {
        query = { userId: { [Op.eq] : userId }, isCompleted : { [Op.eq]: isCompleted}};
      }
     

      return await Todo.findAll({where : query } );
    },
  }
};