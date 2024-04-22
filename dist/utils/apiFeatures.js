"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        let queryObj = Object.assign({}, this.queryString);
        const excludeFields = ['limit', 'page', 'sort', 'fields'];
        excludeFields.forEach((el) => {
            delete queryObj[el];
        });
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (origin) => `$${origin}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query.sort(sortBy);
        }
        return this;
    }
    limitFields() {
        if (this.queryString.fields) {
            const selectedFields = this.queryString.fields.split(',').join(' ');
            this.query.select(selectedFields);
        }
        return this;
    }
    page() {
        const page = (this.queryString.page && +this.queryString.page) || 1;
        const limit = (this.queryString.limit && +this.queryString.limit) || 10;
        this.query.skip((page - 1) * limit).limit(limit);
        return this;
    }
}
exports.default = APIFeatures;
