const connection = require("../database/connection");

module.exports = {
  async list(request, response) {
    const {
      headers: { authorization: ong_id },
      query: { page = 1, limit = 5 }
    } = request;

    const [{ "count(*)": count }] = await connection("incidents").count();

    const incidents = await connection("incidents")
      .select("*")
      .limit(limit)
      .offset((page - 1) * limit)
      .where("ong_id", ong_id);

    response.header("X-Total-Count", count);
    response.json({ incidents });
  }
};
