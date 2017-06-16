module.exports.parseResults = input => {
  const parsedResults = input.map(item => {
    let obj = {
      url: item.link,
      snippet: item.snippet,
      context: item.image.contextLink,
      thumbnail: item.image.thumbnailLink,
    };
    return obj;
  });
  return parsedResults;
};
