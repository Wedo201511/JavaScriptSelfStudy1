function node(val) {
    this.value = val;
    this.left = this.right = null;
  }

  var tree = new node("A");
  tree.left = new node("B1");
  tree.right = new node("B2");
  tree.left.left = new node("C1");
  tree.left.right = new node("C2");
  console.log(tree);

node.prototype.accept = function(visitorObj) {
    visitorObj.visit(this);
    if (this.left) this.left.accept(visitorObj);
    if (this.right) this.right.accept(visitorObj);
}

function visitor() {
    var that = this;
    this.visit = function(tgt) {
        tgt.value = "*"+tgt.value;
    }
    this.highlight = function(tgt) {
        tgt.accept(that);
    }
}

(new visitor()).highlight(tree.left);
console.log(tree);