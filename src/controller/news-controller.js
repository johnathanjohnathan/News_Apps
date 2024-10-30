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

export default { create, edit };
