const fixImagePaths = (req, res, next) => {
  const oldJson = res.json;

  // Helper function to fix image path
  const fixPath = (path) => {
    if (path && path.startsWith('uploads/')) {
      return `${process.env.BASE_URL || `${req.protocol}://${req.get('host')}`}/${path.replace(/\\/g, '/')}`;
    }
    return path;
  };

  // Override res.json
  res.json = function (data) {
    // If the data is an array, loop through each item
    if (Array.isArray(data)) {
      data.forEach(item => {
        item.coverImage = fixPath(item.coverImage);
        item.backgroundImage = fixPath(item.backgroundImage);
        item.image = fixPath(item.image);
        item.logoDark = fixPath(item.logoDark);  // Added fix for logoDark
        item.logoWhite = fixPath(item.logoWhite); // Added fix for logoWhite

        if (Array.isArray(item.images)) {
          item.images = item.images.map(fixPath);
        }
      });
    } else if (data && typeof data === 'object') {
      // If the data is an object, apply the path fix to relevant properties
      data.coverImage = fixPath(data.coverImage);
      data.backgroundImage = fixPath(data.backgroundImage);
      data.image = fixPath(data.image);
      data.logoDark = fixPath(data.logoDark);  // Added fix for logoDark
      data.logoWhite = fixPath(data.logoWhite); // Added fix for logoWhite

      if (Array.isArray(data.images)) {
        data.images = data.images.map(fixPath);
      }
    }

    // Call the original res.json with the modified data
    return oldJson.call(this, data);
  };

  next();
};

module.exports = fixImagePaths;
