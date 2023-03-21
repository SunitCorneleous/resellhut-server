let count = 0;

const viewCount = (req, res, next) => {
  count++;

  console.log(`count: ${count}`);

  //   res.json({ count });

  next();
};

module.exports = viewCount;
