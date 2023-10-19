const db = require("../models");
const ProdCate = db.prodCate;

// api for both insert and update 
const add_Update_Prodcate = async (req, res) => {
    const { prodCatName, prodCatParent, prodCatIsFeatured, prodCatStatus, prodcatId } = req.body;
    if (!prodCatName || !prodCatParent || !prodCatIsFeatured || !prodCatStatus) {
        return res.status(204).json({ success: false, message: "Content is Required" });
    };
    try {
        if (prodcatId) {
            const dataToUpdate = { prodcat_name: prodCatName, prodcat_parent: prodCatParent, prodcat_is_featured: prodCatIsFeatured, prodcat_active: prodCatStatus, prodcat_id: prodcatId };
            console.log(dataToUpdate, "dataToUpdate")
            // return
            const updateProdCate = await ProdCate.update(dataToUpdate, {
                where: { prodcat_id: prodcatId }
            });
            if (updateProdCate[0] === 1) {
                return res.status(200).json({ success: true, message: "Updated successfully" });
            } else {
                return res.status(404).json({ success: false, message: "Record not found for the given ID" });
            };
        }
        else {
            const dataToInsert = { prodcat_name: prodCatName, prodcat_parent: prodCatParent, prodcat_is_featured: prodCatIsFeatured, prodcat_active: prodCatStatus };
            console.log(dataToInsert, "dataToInsert")
            // return
            const addProdCate = await ProdCate.create(dataToInsert);
            return res.status(200).json({ success: true, message: "Successfully inserted", addProdCate });
        };
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong", error });
    };
};
const deleteProdCateById = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    // return

    if (!id) return res.status(400).json({ success: false, message: "id is required" })
    try {
        const deleteCate = await ProdCate.update({ prodcat_deleted: 1 },
            {
                where: {
                    prodcat_id: id
                }
            }
        );
        if (deleteCate[0] === 1) {
            return res.status(200).json({ success: true, message: "Deleted successfully" });
        }
        else {
            return res.status(404).json({ success: false, message: "Record not found for the given ID" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "An error occurred", error });
    }
};
const getallProdCate = async (req, res) => {
    try {
        const categories = await ProdCate.findAll({
            attributes: [
                ["prodcat_id", "prodcatId"],
                ["prodcat_name", "prodCatName"],
                ["prodcat_active", "prodCatStatus"],
                ["prodcat_added_at", "RegDate"]
            ],
            where: {
                prodcat_deleted: 0
            }
        });
        return res.status(200).json({ success: true, message: "ok", "response": categories })
    } catch (error) {
        return res.status(400).json({ success: false, message: "Something Went Wrong" })
    }
};
const getSingleProdCateById = async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ success: false, message: "id is required" });
    try {
        const response = await ProdCate.findByPk(id, {
            attributes: [
                ["prodcat_id", "prodcatId"],
                ["prodcat_name", "prodCatName"],
                ["prodcat_parent", "prodCatParent"],
                ["prodcat_is_featured", "prodCatIsFeatured"],
                ["prodcat_active", "prodCatStatus"],
            ]
        });
        return res.status(200).json({ success: true, message: "Success", response })
    } catch (error) {
        return res.status(400).json({ success: false, message: "Something Went Wrong", error })
    }

}
const updateStatusSingleById = async (req, res) => {
    const id = req.params.id;
    const prodCatStatus = req.body.prodCatStatus;
    if (!id) return res.status(404).json({ success: false, message: "No record found , id is required" })
    try {
        const resposne = await ProdCate.update(
            {
                prodcat_active: prodCatStatus
            },
            {
                where: {
                    prodcat_id: id
                }
            })
        return res.status(200).json({ success: true, message: "Updated SuccessFully", resposne })
    } catch (error) {
        res.status(400).json({ success: false, message: "Something Went Wrong" })
    }
}
const deleteMultipleCateById = async (req, res) => {
    const ids = req.body.prodcatId;
    // return
    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ success: false, message: "Invalid or empty list of IDs" });
    }
    try {
        const response = await ProdCate.update(
            { prodcat_deleted: 1 },
            {
                where: {
                    prodcat_id: ids
                }
            })
        if (response[0] > 0) {
            return res.status(200).json({ success: true, message: "Records deleted successfully", updatedCount: response[0] });
        } else {
            return res.status(404).json({ success: false, message: "No matching records found" });
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: "Something Went Wrong", error })
    }
}
const updateMultipleActiveById = async (req, res) => {
    const ids = req.body.prodcatId;
    const prodCatStatus = req.body.prodCatStatus;
    console.log(ids)
    if (!ids) {
        return res.status(404).json({ success: false, message: "No result found / id required" })
    };
    try {
        const response = await ProdCate.update(
            { prodcat_active: prodCatStatus },
            {
                where: {
                    prodcat_id: ids
                }
            }
        );
        return res.status(200).json({ success: false, message: "updated Successfully", response })
    } catch (error) {
        return res.status(400).json({ success: true, message: "Something Went Wrong", error });
    }
}
module.exports = {
    add_Update_Prodcate, deleteProdCateById,
    getallProdCate, getSingleProdCateById, updateStatusSingleById,
    deleteMultipleCateById, updateMultipleActiveById,
}


