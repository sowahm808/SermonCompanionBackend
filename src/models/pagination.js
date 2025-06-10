exports.paginate = async (Model, { query = {}, page = 1, limit = 10 } = {}) => {
  const skip = (page - 1) * limit;
  const [results, total] = await Promise.all([
    Model.find(query).skip(skip).limit(limit),
    Model.countDocuments(query)
  ]);
  return {
    results,
    total,
    page,
    pages: Math.ceil(total / limit)
  };
};
