import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modleQuery: Query<T[], T>;
    public query: Record<string, unknown>;
    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modleQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        const searchTerm = this?.query?.searchTerm;
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

    sort(){
        const sort = (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
        this.modleQuery = this?.modleQuery?.sort(sort as string);
        
        return this;
    }

    paginate(){
        const limit = Number(this?.query?.limit) || 1;
        const page = Number(this?.query?.page) || 1;
        const skip = (page - 1) * limit;

        this.modleQuery = this?.modleQuery?.skip(skip).limit(limit);
        return this;
    }

    fields(){
        const fields = (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
        this.modleQuery = this?.modleQuery?.select(fields);
        return this;
    }
}

export default QueryBuilder;