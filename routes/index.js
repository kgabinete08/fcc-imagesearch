const express = require('express');
const router = express.Router();
const {catcherrors} = require('./utils/catcherrors');
const imagesearchController = require('../controllers/imagesearchController');

router.get('/', imagesearchController.homePage);
router.get('/api/imagesearch/:term', catcherrors(imagesearchController.search));
router.get(
  '/api/latest/imagesearch',
  catcherrors(imagesearchController.history),
);

module.exports = router;
