

class CrudRepository{
 
    constructor(model)
    {
        this.model = model;
    }
    
    async create(data)
    {
        const response = this.model.create(data);
        return response;
    }
    async getAll()
    {
        const response = await this.model.find({});
        return response;
    }
    async get(id)
    {
        const response = this.model.findById(id);
        return response;
    }

    async deleteOne(id)
    {
        const response = this.model.deleteOne(id);
        return response;
    }
    async delete(id)
    {
        const response = this.model.findByIdAndDelete(id);
        return response;
    }
    async update(id,data)
    {
        const response = this.model.findByIdAndUpdate(id, data, {new : true});
        return response;
    }
}
module.exports = CrudRepository;