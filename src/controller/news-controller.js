import newsService from "../services/news-service";

const create = async (req, res, next) => {
  try {
    const { title, content, categoryId } = req.body;
    const { id } = req.user;
    const request = {
      title,
      content,
      categoryId,
      creatorId: id,
    };

    const result = await newsService.create(req.user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const edit = async (req, res, next) => {
  try {
    const { title, content, categoryId } = req.body;
    const request = {
      id: req.params.id,
      title,
      content,
      categoryId,
      creatorId: req.user.id,
    };

    const result = await newsService.edit(req.user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await newsService.remove(req.user, req.params.id);
    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await newsService.getAll(req.user);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getDetail = async (req, res, next) => {
  try {
    const result = await newsService.getDetail(req.user, req.params.id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const search = async (req, res, next) => {
  try {
    const { title } = req.query;
    const result = await newsService.search(req.user, title);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default { create, edit, remove, getAll, getDetail, search };
