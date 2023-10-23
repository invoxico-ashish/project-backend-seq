const db = require("../models");
const Tag = db.Tags;

const addTag = async (req, res) => {
    const { tagName, tagStatus, tagId } = req.body;
    if (!tagName || !tagStatus) {
        return res.status(400).json({ success: false, message: "name & status is required" });
    } else {
        try {
            // insert tag
            if (!tagId) {
                let dataToInsert = { prodtag_name: tagName, prodtag_active: tagStatus };
                const addTag = await Tag.create(dataToInsert);
                return res.status(201).json({ success: true, message: "tag add successfully", addTag })
            }
            if (tagId) {
                let dataToUpdate = { prodtag_name: tagName, prodtag_active: tagStatus, prodtag_id: tagId };
                const updateTag = await Tag.update(dataToUpdate, {
                    where: {
                        prodtag_id: tagId
                    },
                });
                if (updateTag[0] === 1) {
                    return res.status(200).json({ success: true, message: "tag updated successfully", updateTag });
                }
                else {
                    return res.status(400).json({ success: false, message: "record not found" });
                }
            };
        } catch (error) {
            console.log(error);
            return res.status(400).json({ success: false, message: "something went wrong", error });
        }
    }
};
const getAllTags = async (req, res) => {
    try {
        const allTags = await Tag.findAll({});
        return res.status(200).json({ success: true, message: "successfull", allTags });
    } catch (error) {
        return res.status(400).json({ success: false, message: "something went wrong", error });
    };
};
const getSingleTag = async (req, res) => {
    const id = req.params.id;
    try {
        const singleTag = await Tag.findByPk(id);
        return res.status(200).json({ success: true, message: "successfull", singleTag });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: "Something went wrong", error });
    }
};
const changeStatus = async (req, res) => {
    const id = req.params.id;
    const prodtag_status = req.body.prodtag_active;
    if (prodtag_status || prodtag_status === 0) {
        try {
            const updateStatus = await Tag.update(
                { prodtag_active: prodtag_status },
                {
                    where: {
                        prodtag_id: id,
                    },
                });
            return res.status(200).json({ success: true, message: "updated Successfully", updateStatus });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ success: false, message: "something wnent wrong", error });
        };
    }
    else {
        return res.status(404).json({ success: false, message: "status  tus is required" });
    }
};
const deleteSingleTag = async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            const deleteTag = await Tag.update(
                {
                    prodtag_delete: 1,
                }, {
                where: {
                    prodtag_id: id
                }
            });
            return res.status(200).json({ success: true, message: "Tag deleted successfully" })
        } catch (error) {
            return res.status(400).json({ success: false, message: "something went wrong", error })
        }
    }
    return res.status(404).json({ success: false, message: "no record found or id is required" })
};
const changeStatusMultiple = async (req, res) => {
    const prodtag_id = req.body.prodtag_id;
    const prodtag_status = req.body.prodtag_active;
    if (prodtag_id.length > 0 || prodtag_status || prodtag_status === 0) {
        try {
            const updateTag = await Tag.update({
                prodtag_active: prodtag_status
            },
                {
                    where: {
                        prodtag_id: prodtag_id
                    },
                },
            );
            return res.status(200).json({ success: true, message: "update successfully", updateTag });
        } catch (error) {
            return res.status(400).json({ success: false, message: "something went wrong", error });
        }
    } else {
        return res.status(404).json({ success: false, message: "id or status is required ", error });
    };
};
const deleteMultipleTags = async (req, res) => {
    const id = req.body.prodtag_id;
    if (id.length > 0) {
        try {
            const deleteMultiple = await Tag.update({
                prodtag_delete: 1
            }, {
                where: {
                    prodtag_id: id
                },
            });
            return res.status(200).json({ success: true, message: "deleted successfully", deleteMultiple })
        } catch (error) {
            return res.status(400).json({ success: false, message: "something went wrong", error })
        }
    }
    else {
        return res.status(404).json({ success: false, message: "no record found or id is required" })
    };
};
module.exports = { addTag, getAllTags, getSingleTag, changeStatus, deleteSingleTag, changeStatusMultiple, deleteMultipleTags };