
export class RaGsConditionMaker {

    static equal(data, key, value){
        if(!data.where){
            data.where = {}
        }
        if (!data.where.eq){
            data.where.eq = {}
        }
        data.where.eq[key] = value;
        return data;
    }
}