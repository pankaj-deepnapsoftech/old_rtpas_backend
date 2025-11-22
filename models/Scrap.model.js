const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ScrapSchema = new Schema({
    Scrap_name: { type: String, required: true },
    Scrap_id: { type: String, unique: true },
    price: { type: Number, default: 0 },
    Extract_from: { type: String, required: true },
    Category: { type: String, required: true },
    qty: { type: Number, required: true, default: 0 },
    description: { type: String }
}, { timestamps: true }); // <-- IMPORTANT


ScrapSchema.pre("save", async function (next) {
    if (this.Scrap_id) return next(); // skip if already exists

    // Fetch last inserted scrap item
    const lastItem = await mongoose
        .model("Scrap-data")
        .findOne({})
        .sort({ createdAt: -1 });

    let nextNumber = 1;

    if (lastItem && lastItem.Scrap_id) {
        const lastId = lastItem.Scrap_id.split("-").pop();
        nextNumber = parseInt(lastId) + 1;
    }

    const id = String(nextNumber).padStart(5, "0");

    this.Scrap_id = `SCRAP-${id}`;

    next();
});


ScrapSchema.pre("insertMany", async function (next, docs) {
    try {
        const ScrapModel = mongoose.model("Scrap-data"); // <-- your model name

        for (const doc of docs) {
            if (doc.Scrap_id) continue;

            // get last scrap record
            const lastItem = await ScrapModel
                .findOne({})
                .sort({ _id: -1 })
                .lean();

            let nextNumber = 1;

            if (lastItem?.Scrap_id) {
                const lastId = lastItem.Scrap_id.split("-").pop();
                nextNumber = Number(lastId) + 1;
            }

            doc.Scrap_id = `SCRAP-${String(nextNumber).padStart(5, "0")}`;
        }

        return next();
    } catch (err) {
        return next(err);
    }
});







exports.ScrapModel = model("Scrap-data", ScrapSchema);






