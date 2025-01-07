class Iterator {
  next() {
    throw new Error('Method "next" must be implemented');
  }

  hasNext() {
    throw new Error('Method "hasNext" must be implemented');
  }
}

module.exports = Iterator;
