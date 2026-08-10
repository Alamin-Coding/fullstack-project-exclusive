const addProductController = async (req, res)=> {
    const {title, price} = req.body;

    if(!title && !price ) {
        return res.json({
            success: false,
            message: "All Field are required",
            deleteItem: editItem.categoryName
        });
    }


    res.json({
            success: true,
            message: "Product created successfully",
            data: req.body
        });
}


module.exports = {addProductController}