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

        if (Array.isArray(item.images)) {
          item.images = item.images.map(fixPath);
        }
      });
    } else if (data && typeof data === 'object') {
      // If the data is an object, apply the path fix to relevant properties
      data.coverImage = fixPath(data.coverImage);
      data.backgroundImage = fixPath(data.backgroundImage);
      data.image = fixPath(data.image);

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


// const fixImagePaths = (req, res, next) => {
//   const oldJson = res.json;

//   // for each response, check if the data is an array or an object
//   res.json = function(data) {
//     // if the data is an array, loop through each item
//     if (Array.isArray(data)) {
//       data.forEach(item => {
//         if (item.coverImage && item.coverImage.startsWith('uploads/')) {
//           item.coverImage = `${process.env.BASE_URL || `${req.protocol}://${req.get('host')}`}/${item.coverImage.replace(/\\/g, '/')}`;
//         }
//         if (item.backgroundImage && item.backgroundImage.startsWith('uploads/')) {
//           item.backgroundImage = `${process.env.BASE_URL || `${req.protocol}://${req.get('host')}`}/${item.backgroundImage.replace(/\\/g, '/')}`;
//         }
//         if (item.images && Array.isArray(item.images)) {
//           item.images = item.images.map(image => {
//             return `${process.env.BASE_URL || `${req.protocol}://${req.get('host')}`}/${image.replace(/\\/g, '/')}`;
//           });
//         }
//         // Check and fix for the 'image' property as well
//         if (item.image && item.image.startsWith('uploads/')) {
//           item.image = `${process.env.BASE_URL || `${req.protocol}://${req.get('host')}`}/${item.image.replace(/\\/g, '/')}`;
//         }
//       });
//     } else if (data && typeof data === 'object') {
//       // if the data is an object, check if it has a coverImage, image, or images property
//       if (data.coverImage && data.coverImage.startsWith('uploads/')) {
//         data.coverImage = `${process.env.BASE_URL || `${req.protocol}://${req.get('host')}`}/${data.coverImage.replace(/\\/g, '/')}`;
//       }
//       if (data.backgroundImage && data.backgroundImage.startsWith('uploads/')) {
//         data.backgroundImage = `${process.env.BASE_URL || `${req.protocol}://${req.get('host')}`}/${data.backgroundImage.replace(/\\/g, '/')}`;
//       }
//       if (data.images && Array.isArray(data.images)) {
//         data.images = data.images.map(image => {
//           return `${process.env.BASE_URL || `${req.protocol}://${req.get('host')}`}/${image.replace(/\\/g, '/')}`;
//         });
//       }
//       // Check and fix for the 'image' property as well
//       if (data.image && data.image.startsWith('uploads/')) {
//         data.image = `${process.env.BASE_URL || `${req.protocol}://${req.get('host')}`}/${data.image.replace(/\\/g, '/')}`;
//       }
//     }

//     // execute the original res.json function with the modified data
//     return oldJson.call(this, data);
//   };

//   next();
// };

// module.exports = fixImagePaths;
