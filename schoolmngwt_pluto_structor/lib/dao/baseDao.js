"use strict";

//========================== Class Definitions Start =====================

class BaseDao {
    constructor(dbModel) {
        //Get Model
        this.Model = dbModel;
    }
    save(object) {
        return this.Model.create(object);
    }

    findOne(query, projection) {
        return this.Model.findOne(query, projection).exec();
    }

    findOneNew(query, projection) {
        return this.Model.findOne(query, projection);
    }

    findOneAndUpdate(query, update, options) {
        return this.Model.findOneAndUpdate(query, update, options).exec();
    }
    // {query:query,update:update}
    findAndModify({ query: query, update: update }) {
        return this.Model.findAndModify({ query: query, update: update }).exec();
    }
}

//========================== Export module start =======================

module.exports = BaseDao;

//========================== Export module End =======================
