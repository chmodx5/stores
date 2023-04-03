module.exports = (image, imageName) => {
  //   return console.log(image);
  //check if image is an array or object

  if (!image) {
    return {
      isValid: false,
      error: "No image provided",
    };
  }

  if (Array.isArray(image)) {
    let validationResponse = [];
    image.map((image) => {
      const fileType = image.mimetype.split("/")[1];
      const allowedFileTypes = ["jpeg", "jpg", "png", "gif"];

      if (!allowedFileTypes.includes(fileType)) {
        validationResponse.push({
          isValid: false,
          error:
            "Invalid file type. Allowed file types are: jpeg, jpg, png, gif",
        });
      }

      if (image.size > 5000000) {
        validationResponse.push({
          isValid: false,
          error: "file size exceeeds limit of 5mb",
        });
      }

      const imageUrl = `${
        !imageName
          ? image.fieldname.replace(" ", "-")
          : imageName.replace(" ", "-")
      }-${image.originalname.split(".")[0] + "-" + Date.now()}.${
        image.mimetype.split("/")[1]
      }`;

      validationResponse.push({
        isValid: true,
        imageUrl,
      });
    });

    return validationResponse;
  } else {
    const fileType = image.mimetype.split("/")[1];
    const allowedFileTypes = ["jpeg", "jpg", "png", "gif"];

    if (!allowedFileTypes.includes(fileType)) {
      return {
        isValid: false,
        error: "Invalid file type. Allowed file types are: jpeg, jpg, png, gif",
      };
    }

    if (image.size > 5000000) {
      return { isValid: false, error: "file size exceeeds limit of 5mb" };
    }

    const imageUrl = `${
      !imageName
        ? image.fieldname.replace(" ", "-")
        : imageName.replace(" ", "-")
    }-${Date.now()}.${image.mimetype.split("/")[1]}`;

    return {
      isValid: true,
      imageUrl,
    };
  }
};
