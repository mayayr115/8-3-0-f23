const knex = require('./knex');
class Posts {

  static async create(title, body, fellowId) {
    const { rows } = await knex.raw(`
      INSERT INTO posts (title, body, fellow_id)
      VALUES(?, ?, ?)
      RETURNING *
    `, [title, body, fellowId]); 

    return rows[0];
  }

  static async list() { // Get all
    const { rows } = await knex.raw(`
      SELECT * FROM posts;
    `);

    return rows;
  }

  static async find(id) { // Get one
    const { rows } = await knex.raw(`
      SELECT * FROM post
      WHERE id=?
    `, [id]);

    return rows[0];
  }

  static async findByFellowId(fellowId) { // Get all
    const { rows } = await knex.raw(`
      SELECT * FROM post
      WHERE fellow_id=?
    `, [fellowId]);

    return rows;
  }

  static async editName(id, newName) { // Update
    const { rows } = await knex.raw(`
      UPDATE post
      SET name=?
      WHERE id=?
      RETURNING *;
    `, [newName, id]);

    return rows[0];
  }

  static async delete(id) { // Delete
    const { rows } = await knex.raw(`
      DELETE FROM post
      WHERE id=?
      RETURNING *;
    `, [id]);

    return rows;
  }

  static async deleteAllPostForFellow(fellowId) { // Delete
    const { rows } = await knex.raw(`
      DELETE FROM post
      WHERE fellow_id=?
      RETURNING *;
    `, [fellowId]);

    return rows;
  }
}

module.exports = Posts;