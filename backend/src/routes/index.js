import ProductRouter from "./ProductRouter.js";
import UserRouter from "./UserRouter.js";

const routes = (app) => {
    app.use('/api/users', UserRouter)
    app.use('/api/products', ProductRouter)
}

export default routes;