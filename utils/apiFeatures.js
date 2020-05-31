class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // --- 1A) FILTERING
    /* In order to allow future developemnt of pagination, sorting, etc, I:
     * a)Made a hard copy of the Query Object
     * b)Create a array of the fields that I want to exclude from the queryObj
     * c)Used a forEach (to not create a new array) in order to remove these fields from the Oject
     * that will be used in the .find()
     */
    const queryObj = { ...this.queryString }; //Copy of the Query Obj
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // --- 1B) ADVANCED FILTERING (greater than, less than, etc...)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); //Using regex to add "$" in order to mongoose be able to use this params in the query

    this.query = this.query.find(JSON.parse(queryStr));
    // let query = Listing.find(JSON.parse(queryStr)); //find() = Return an array w/ all the documents
    // "Listing.find(queryObj)" returns a query - that is why I can chain others methods (to sort, to use paginations,etc...)

    return this;
  }

  sort() {
    // 2) SORTING
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy); //Ascending order
      //To descending order, add "-" in front of the field (Example: ?sort=-rent)
    } else {
      this.query = this.query.sort('-createdDate'); //If the user doesn't specify the sort attribute, the API wil return from the most recent listing
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select(
        'title pictures city state country zip rent utilitiesIncl latitude longitude type'
      ); //API will return by default these fields
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1; //Multiplying by 1 to convert a string to a number (Because numbers in QUERIES are converted by default to Strings)
    const limit = this.queryString.limit * 1 || 30; //Default is to show 30 results per page
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
