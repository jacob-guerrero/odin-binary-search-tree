const createNode = (value, left = null, right = null) => {
  return { value, left, right };
};

const Tree = (arr) => {
  const root = buildTree(arr);

  return { root };
};

