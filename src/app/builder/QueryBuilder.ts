import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modleQuery: Query<T[], T>;
    public query: Record<string, unknown>;
    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modleQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        if (this?.query?.searchTerm) {
            this.modleQuery = this?.modleQuery?.find({
                $or: searchableFields.map(field => (
                    {
                        [field]: { $regex: searchTerm, $options: 'i' },
                    }
                ) as FilterQuery<T>,
                ),
            });
        }
        return this;
    }

    filter() {
        const queryObj = { ...this.query };
        const excludeFields = ['searchTerms', 'sort', 'limit', 'page', 'fields'];
        excludeFields.forEach(element => delete queryObj[element]);
        this.modleQuery = this.modleQuery.find(queryObj);
        return this;
    }
}