const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (
  Model,
  selectFields = '',
  populateOptions = [],
  filter = {},
) =>
  catchAsync(async (req, res, next) => {
    let query = Model.find(filter);

    if (selectFields) {
      query = query.select(selectFields);
    }

    populateOptions.forEach((option) => {
      query = query.populate(option);
    });

    const docs = await query;

    res.status(200).json({
      status: 'success',
      result: docs.length,
      data: {
        data: docs,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (popOptions) {
      if (Array.isArray(popOptions)) {
        popOptions.forEach((option) => {
          // console.log(`Populating option ${index}: `, option);
          query = query.populate(option);
        });
      } else {
        // console.log('Populating single option: ', popOptions);
        query = query.populate(popOptions);
      }
    }

    // console.log('Query after population options:', query);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
