const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString("HEX");

    await connection("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });
    response.json({ id });
  },
  async list(request, response) {
    const { page = 1, limit = 5 } = request.query;

    const [{ "count(*)": count }] = await connection("ongs").count();

    const ongs = await connection("ongs")
      .select("*")
      .limit(limit)
      .offset((page - 1) * limit);

    response.header("X-Total-Count", count);

    response.json({ ongs });
  }
};
