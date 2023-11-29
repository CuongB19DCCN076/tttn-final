import ProductService from "../services/ProductService.js";

const ProductController = {
    createProduct: async (req, res) => {
        try{
            const { name, image, type, countInStock, price, rating, description, discount } = req.body;
            if (!name || !image || !type || !countInStock || !price || !rating || !discount) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'Đầu vào không được để trống!'
                })
            }
            const response = await ProductService.createProductService(req.body);
            return res.status(201).json(response);
        }catch(e){
            return res.status(401).json({message: e})
        }
    },
    updateProduct: async (req, res) => {
        try {
            const productId = req.params.id
            const data = req.body
            if (!productId) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The productId is required'
                })
            }
            const response = await ProductService.updateProductService(productId, data)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    },
    getDetailsProduct: async (req, res) => {
        try {
            const productId = req.params.id
            if (!productId) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The productId is required'
                })
            }
            const response = await ProductService.getDetailsProductService(productId)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.id
            if (!productId) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The productId is required'
                })
            }
            const response = await ProductService.deleteProductService(productId)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    },
    deleteMany: async (req, res) => {
        try {
            const ids = req.body.ids
            if (!ids) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The ids is required'
                })
            }
            const response = await ProductService.deleteManyProductService(ids)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    }, 
    getAllProduct: async (req, res) => {
        try {
            const { limit, page, sort, filter } = req.query
            const response = await ProductService.getAllProductService(Number(limit) || null, Number(page) || 0, sort, filter)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    },
    getAllType: async (req, res) => {
        try {
            const response = await ProductService.getAllTypeService()
            return res.status(200).json(response)
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
    }
}

export default ProductController;