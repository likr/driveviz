const path = (file) => {
  if (file === null) {
    return "/";
  }
  if (file.depth > 0) {
    return `${path(file.parent)}/${file.item ? file.item.title : file.title}`;
  }
  return "";
};

export default path;
