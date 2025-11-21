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
}, { timestamps: true });


// -------------------------------------------------------
// AUTO–INCREMENT for .save()
// -------------------------------------------------------
ScrapSchema.pre("save", async function (next) {
    if (this.Scrap_id) return next(); // skip if already exists

    try {
        const lastItem = await mongoose
            .model("Scrap-data")
            .findOne({})
            .sort({ createdAt: -1 });

        let nextNumber = 1;

        if (lastItem && lastItem.Scrap_id) {
            const lastId = lastItem.Scrap_id.split("-").pop();
            nextNumber = parseInt(lastId) + 1;
        }

        this.Scrap_id = `SCRAP-${String(nextNumber).padStart(5, "0")}`;

        next();
    } catch (err) {
        next(err);
    }
});


// -------------------------------------------------------
// AUTO–INCREMENT for insertMany()
// -------------------------------------------------------
ScrapSchema.pre("insertMany", function (next, docs) {
    (async () => {
        try {
            // Fetch last inserted ID only once
            const lastItem = await mongoose
                .model("Scrap-data")
                .findOne({})
                .sort({ createdAt: -1 });

            let nextNumber = 1;

            if (lastItem && lastItem.Scrap_id) {
                const lastId = lastItem.Scrap_id.split("-").pop();
                nextNumber = parseInt(lastId) + 1;
            }

            // Assign unique IDs for each document in the batch
            for (let doc of docs) {
                if (doc.Scrap_id) continue;

                doc.Scrap_id = `SCRAP-${String(nextNumber).padStart(5, "0")}`;
                nextNumber++; // increment for next doc
            }

            next();
        } catch (err) {
            next(err);
        }
    })();
});


module.exports.ScrapModel = model("Scrap-data", ScrapSchema);
