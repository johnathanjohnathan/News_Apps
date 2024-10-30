import newsCategoryService from "../services/news-category-service";

const create = async (req, res, next) => {
  try {
    const result = await newsCategoryService.create(req.user, req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await newsCategoryService.get(req.user);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const request = {
      id,
      name,
      description,
    };
    const result = await newsCategoryService.edit(req.user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await newsCategoryService.remove(req.user, req.params.id);
    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e);
  }
};

export default { create, get, edit, remove };
