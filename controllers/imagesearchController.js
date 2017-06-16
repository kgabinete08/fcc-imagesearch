const mongoose = require('mongoose');
const Search = mongoose.model('Search');
const {parseResults} = require('./utils/parseResults');
const axios = require('axios');

exports.homePage = (req, res) => {
  res.render('index', {title: 'Imagesearch Abstraction'});
};

exports.search = async (req, res) => {
  const searchTerm = req.params.term;
  await new Search({term: searchTerm}).save();
  // prettier-ignore
  const searchRequest = await axios.get(`https://www.googleapis.com/customsearch/v1?q=${searchTerm}&cx=${process.env.CSE_ID}&safe=medium&searchType=image&start=${req.query.offset}&fields=items(image(contextLink%2CthumbnailLink)%2Clink%2Csnippet)%2Curl&key=${process.env.SEARCH_KEY}`);
  const resultData = searchRequest.data.items;
  const results = parseResults(resultData);
  res.json(results);
};

exports.history = async (req, res) => {
  const list = await Search.find({}, {_id: 0, __v: 0})
    .limit(10)
    .sort({when: -1});
  res.json(list);
};
