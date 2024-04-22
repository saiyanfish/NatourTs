class APIFeatures {
  public query: any;
  private queryString: any;

  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  filter(): this {
    let queryObj = { ...this.queryString };
    const excludeFields = ['limit', 'page', 'sort', 'fields'];
    excludeFields.forEach((el) => {
      delete queryObj[el];
    });
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (origin) => `$${origin}`,
    );
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort(): this {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query.sort(sortBy);
    }
    return this;
  }

  limitFields(): this {
    if (this.queryString.fields) {
      const selectedFields = this.queryString.fields.split(',').join(' ');
      this.query.select(selectedFields);
    }
    return this;
  }

  page(): this {
    const page = (this.queryString.page && +this.queryString.page) || 1;
    const limit = (this.queryString.limit && +this.queryString.limit) || 10;
    this.query.skip((page - 1) * limit).limit(limit);
    return this;
  }
}

export default APIFeatures;
