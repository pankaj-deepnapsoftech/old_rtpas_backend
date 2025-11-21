const { ScrapModel } = require("../models/Scrap.model");



class ScrapMaterial {



    async createScrapMaterial(req, res) {
        try {
            const data = req.body;
            const result = await ScrapModel.create(data);
            res.status(200).json({
                message: "Scrap Material is Created",
                data: result
            })
        } catch (error) {
            res.status(400).json({
                message: "Scrap material not created"
            })
        }

    };

    async getScrapMaterial(req, res) {
        try {
            let { page, limit } = req.query;
            page = parseInt(page) || 1;
            limit = parseInt(limit) || 10;
            const skip = (page - 1) * limit;

            const data = await ScrapModel.find({}).skip(skip).limit(limit);
            res.status(200).json({
                message: "Scrap Material is Created",
                data: data
            })
        } catch (error) {
            res.status(400).json({
                message: "Scrap material not get"
            })
        }

    };

    async deleteScrapMaterial(req, res) {
        try {
            const { id } = req.params;
            const result = await ScrapModel.findByIdAndDelete(id);
            if (!result) {
                res.status(400).json({
                    message: "Scrap material not Deleted"
                })
            }
            res.status(200).json({
                message: "Scrap material Deleted"
            })
        } catch (error) {
            res.status(400).json({
                message: "Scrap material not Deleted"
            })
        }
    };

    async updateScrapMaterial(req,res) {
        try {
            const {id} = req.params;
            const data = req.body;
            const result = await ScrapModel.findByIdAndUpdate(id,data);
              if (!result) {
                res.status(400).json({
                    message: "Scrap material not Updated"
                })
            }
            res.status(200).json({
                message: "Scrap material Updated"
            })

        } catch (error) {
            res.status(400).json({
                message: "Scrap material not Updated"
            })
        }
    };

    // async FilterScrapMaterial(req,res){
    //     const  
    // }
}

module.exports = { ScrapMaterial }