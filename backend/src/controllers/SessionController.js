const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const {
      body: { id }
    } = request;

    const [{ "count(*)": count }] = await connection("ongs").count();

    const ong = await connection("ongs")
      .select("name")
      .where("id", id)
      .first();

    if (!ong) {
      return response.status(400).json({ error: `No ONG found with id ${id}` });
    }
    response.header("X-Total-Count", count);
    return response.json({ ong });
  }
};
