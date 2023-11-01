const createNode = (value, left = null, right = null) => {
  return { value, left, right };
};

const Tree = (arr) => {
  const root = buildTree(arr);

  return { root };
};

const buildTree = (array) => {
  // Use new Set(array) to store unique values (remove duplicates)
  // Use sort((a, b) => a - b) to sort array values in ascending order
  const sortedArray = Array.from(new Set(array)).sort((a, b) => a - b);

  const createBalancedBST = (arr, start, end) => {
    if (start > end) {
      return null;
    }

    const mid = parseInt((start + end) / 2);
    const node = createNode(arr[mid]);

    node.left = createBalancedBST(arr, start, mid - 1);
    node.right = createBalancedBST(arr, mid + 1, end);
    return node;
  };

  return createBalancedBST(sortedArray, 0, sortedArray.length - 1);
};

const insert = (root, value) => {
  if (root === null) {
    return createNode(value);
  }

  if (value < root.value) {
    root.left = insert(root.left, value);
  } else if (value > root.value) {
    root.right = insert(root.right, value);
  }

  return root;
};

const deleteNode = (root, value) => {
  if (root === null) {
    return root;
  }

  if (value < root.value) {
    root.left = deleteNode(root.left, value);
  } else if (value > root.value) {
    root.right = deleteNode(root.right, value);
  } else {
    if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    }

    root.value = findMin(root.right);
    root.right = deleteNode(root.right, root.value);
  }

  return root;
};

const findMin = (root) => {
  while (root.left !== null) {
    root = root.left;
  }
  return root.value;
};

const find = (root, val) => {
  if (root === null || root.value === val) {
    return root;
  }

  if (val < root.value) {
    return find(root.left, val);
  } else {
    return find(root.right, val);
  }
};

// Traverse the tree in breadth-first level order:
const levelOrder = (root, func = null) => {
  const result = [];
  const queue = [];

  if (root !== null) {
    queue.push(root);
  }

  while (queue.length > 0) {
    const node = queue.shift();
    if (func !== null) {
      func(node);
    } else {
      result.push(node.value);
    }

    if (node.left !== null) {
      queue.push(node.left);
    }
    if (node.right !== null) {
      queue.push(node.right);
    }
  }

  if (func === null) {
    return result;
  }
};

// Inorder traversal: Left -> Node -> Right
const inorder = (root, func = null) => {
  const result = [];

  const traverse = (node) => {
    if (node !== null) {
      traverse(node.left);
      if (func !== null) {
        func(node);
      } else {
        result.push(node.value);
      }
      traverse(node.right);
    }
  };

  traverse(root);

  if (func === null) {
    return result;
  }
};

// Preorder traversal: Node -> Left -> Right
const preorder = (root, func = null) => {
  const result = [];

  const traverse = (node) => {
    if (node !== null) {
      if (func !== null) {
        func(node);
      } else {
        result.push(node.value);
      }
      traverse(node.left);
      traverse(node.right);
    }
  };

  traverse(root);

  if (func === null) {
    return result;
  }
};

// Postorder traversal: Left -> Right -> Node
const postorder = (root, func = null) => {
  const result = [];

  const traverse = (node) => {
    if (node !== null) {
      traverse(node.left);
      traverse(node.right);
      if (func !== null) {
        func(node);
      } else {
        result.push(node.value);
      }
    }
  };

  traverse(root);

  if (func === null) {
    return result;
  }
};

const height = (node) => {
  if (node === null) {
    return -1; // Height of an empty node is -1
  }

  const leftHeight = height(node.left);
  const rightHeight = height(node.right);

  return 1 + Math.max(leftHeight, rightHeight);
};

const depth = (node, root) => {
  if (root === null) {
    return -1; // Depth of an empty node or root node is -1
  }

  let count = -1;

  if (
    root.value == node.value ||
    // Otherwise, check if node is
    // present in the left subtree
    (count = depth(node, root.left)) >= 0 ||
    // Otherwise, check if node is
    // present in the right subtree
    (count = depth(node, root.right)) >= 0
  )
    // Return depth of the node
    return count + 1;

  return count;
};

const isBalanced = (root) => {
  const checkBalance = (node) => {
    if (node === null) {
      return { balanced: true, height: -1 };
    }

    const left = checkBalance(node.left);
    if (!left.balanced) {
      return { balanced: false, height: 0 };
    }

    const right = checkBalance(node.right);
    if (!right.balanced) {
      return { balanced: false, height: 0 };
    }

    const balanced = Math.abs(left.height - right.height) <= 1;
    const height = Math.max(left.height, right.height) + 1;
    return { balanced, height };
  };

  return checkBalance(root).balanced;
};

const rebalance = (root) => {
  const values = inorder(root);

  const newRoot = Tree(values);
  return newRoot;
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

/* const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const BST = Tree(array);
console.log(BST.root);
prettyPrint(BST.root);
insert(BST.root, 15);
prettyPrint(BST.root);
deleteNode(BST.root, 8);
prettyPrint(BST.root);
console.log(find(BST.root, 9));
console.log(levelOrder(BST.root));
console.log(inorder(BST.root));
console.log(preorder(BST.root));
console.log(postorder(BST.root));
console.log(height(find(BST.root, 9)));
console.log(depth(find(BST.root, 23), BST.root));
console.log(isBalanced(BST.root));
deleteNode(BST.root, 3);
deleteNode(BST.root, 1);
console.log(isBalanced(BST.root));
const BSTRebalanced = rebalance(BST.root);
prettyPrint(BSTRebalanced.root);
console.log(levelOrder(BSTRebalanced.root));
console.log(isBalanced(BSTRebalanced.root)); */

const randNumArray = Array.from({ length: 10 }, () =>
  Math.floor(Math.random() * 100)
);
const BSTRandom = Tree(randNumArray);
const isBSTBalanced = isBalanced(BSTRandom.root);
console.log(isBSTBalanced);

prettyPrint(BSTRandom.root);
console.log(levelOrder(BSTRandom.root));
console.log(preorder(BSTRandom.root));
console.log(postorder(BSTRandom.root));
console.log(inorder(BSTRandom.root));

console.log(randNumArray);
