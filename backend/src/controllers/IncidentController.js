const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const {
      body: { title, description, value },
      headers: { authorization: ong_id }
    } = request;

    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });
    response.json({ id });
  },
  async list(request, response) {
    const { page = 1, limit = 5 } = request.query;

    const [{ "count(*)": count }] = await connection("incidents").count();

    const incidents = await connection("incidents")
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf"
      ])
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(limit)
      .offset((page - 1) * limit);
    response.header("X-Total-Count", count);
    response.json({ incidents });
  },
  async delete(request, response) {
    const {
      params: { id },
      headers: { authorization: ong_id }
    } = request;

    const incident = await connection("incidents")
      .select("ong_id")
      .where("id", id)
      .first();

    if (incident.ong_id !== ong_id) {
      return response.status(401).json({ error: "Operation not permitted." });
    }

    await connection("incidents")
      .delete({
        id
      })
      .where({ id });

    response.status(204).send();
  }
};
