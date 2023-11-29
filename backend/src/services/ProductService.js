import Product from "../models/ProductModel.js";

const ProductService = {
    createProductService: (newProduct) => {
        return new Promise(async (resolve, reject) => {
            const { name, image, type, countInStock, price, rating, description,discount } = newProduct
            
            try {
                const checkProduct = await Product.findOne({
                    name: name
                })

                if (checkProduct !== null) {
                    resolve({
                        status: 'ERR',
                        message: 'Tên sản phẩm đã tồn tại!'
                    })
                }
                const newProduct = await Product.create({
                    name, 
                    image, 
                    type, 
                    countInStock: Number(countInStock), 
                    price, 
                    rating, 
                    description,
                    discount: Number(discount),
                })
                if (newProduct) {
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: newProduct
                    })
                }
            } catch (e) {
                reject(e)
            }
        })
    },
    updateProductService: (productId, data) => {
        return new Promise(async (resolve, reject) => {
            try{
                const checkProduct = await Product.findById({_id: productId});
                if(checkProduct === null){
                    resolve({
                        status: "ERR",
                        message: "Sản phẩm không tồn tại!"
                    })
                }
                const productUpdate = await Product.findByIdAndUpdate(productId, data, {new: true});
                resolve({
                    status: "OK",
                    message: "Cập nhật thành công!",
                    data: productUpdate
                })
            }catch(e){
                reject(e)
            }
        })
    },
    deleteProductService: (productId) => {
        return new Promise(async (resolve, reject) => {
            try{
                const checkProduct = await Product.findById({_id: productId});
                if(checkProduct === null){
                    resolve({
                        status: "ERR",
                        message: "Sản phẩm không tồn tại!"
                    })
                }
                const productDelete = await Product.findByIdAndDelete(productId);
                if(productDelete === null){
                    resolve({
                        status: "ERR",
                        message: "Xóa sản phẩm thất bại!"
                    })
                }
                resolve({
                    status: "OK",
                    message: "Xóa sản phẩm thành công!",
                })
            }catch(e){
                reject(e)
            }
        })
    },
    deleteManyProductService: (ids) => {
        return new Promise(async (resolve, reject) => {
            try{
                await Product.deleteMany({ _id: ids },(err) => {
                    if (err) {
                        resolve({
                            status: "ERR",
                            message: "Xóa các sản phẩm thất bại!"
                        })
                    } else {
                        resolve({
                            status: "OK",
                            message: "Xóa các sản phẩm thành công!"
                        })
                    }
                  });
            }catch(e){
                reject(e)
            }
        })
    },
    getDetailsProductService: (productId) => {
        return new Promise(async (resolve, reject) => {
            try{
                const checkProduct = await Product.findById({_id: productId});
                if(checkProduct === null){
                    resolve({
                        status: "ERR",
                        message: "Sản phẩm không tồn tại!"
                    })
                }
                resolve({
                    status: "OK",
                    message: "Lấy thông tin sản phẩm thành công!",
                    data: checkProduct
                })
            }catch(e){
                reject(e)
            }
        })
    },
    getAllProductService: (limit, page, sort, filter) => {
        return new Promise(async (resolve, reject) => {
            try {
                const totalProduct = await Product.count()
                let allProduct = []
                if (filter) {
                    const label = filter[0];
                    const allObjectFilter = await Product.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit).sort({createdAt: -1, updatedAt: -1})
                    console.log(allObjectFilter)
                    resolve({
                        status: 'OK',
                        message: 'Success',
                        data: allObjectFilter,
                        total: totalProduct,
                        pageCurrent: Number(page + 1),
                        totalPage: Math.ceil(totalProduct / limit)
                    })
                }
                if (sort) {
                    const objectSort = {}
                    objectSort[sort[1]] = sort[0]
                    const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort).sort({createdAt: -1, updatedAt: -1})
                    resolve({
                        status: 'OK',
                        message: 'Success',
                        data: allProductSort,
                        total: totalProduct,
                        pageCurrent: Number(page + 1),
                        totalPage: Math.ceil(totalProduct / limit)
                    })
                }
                if(!limit) {
                    allProduct = await Product.find().sort({createdAt: -1, updatedAt: -1})
                }else {
                    allProduct = await Product.find().limit(limit).skip(page * limit).sort({createdAt: -1, updatedAt: -1})
                }
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allProduct,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            } catch (e) {
                reject(e)
            }
        })
    },
    getAllTypeService: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const allType = await Product.distinct('type')
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allType,
                })
            } catch (e) {
                reject(e)
            }
        })
    }
}

export default ProductService;
