import AdminPage from "../pages/AdminPage/AdminPage";
import TKDay from "../pages/AdminPage/Dashboard/TKDay";
import TKProduct from "../pages/AdminPage/Dashboard/TKProduct";
import BillingAdmin from "../pages/AdminPage/Ecommerce/BillingAdmin";
import UpdateOrder from "../pages/AdminPage/Ecommerce/UpdateOrder";
import ProductsAdmin from "../pages/AdminPage/Ecommerce/UpdateOrder";
import AddProduct from "../pages/AdminPage/Products/AddProduct";
import AllProduct from "../pages/AdminPage/Products/AllProduct";
import UpdateProduct from "../pages/AdminPage/Products/UpdateProduct";
import Registration from "../pages/AdminPage/Registration/Registration";
import AddUser from "../pages/AdminPage/Users/AddUser";
import AllUser from "../pages/AdminPage/Users/AllUser";
import UpdateUser from "../pages/AdminPage/Users/UpdateUser";
import Warranty from "../pages/AdminPage/Warranty/Warranty";
import Cart from "../pages/Cart/Cart";
import DetailProduct from "../pages/DetailProduct/DetailProduct";
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import OrderDetail from "../pages/OrderDetail/OrderDetail";
import OrderFail from "../pages/OrderFail/OrderFail";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import Products from "../pages/Products/Products";
import Profile from "../pages/Profile/Profile";
import Search from "../pages/Search/Search";
import SignUp from "../pages/SignUp/SignUp";
import User from "../pages/User/User";

export const routes = [
    {
        path: "/",
        page: HomePage,
        isShowHeader: true
    },
    {
        path: "/login",
        page: Login,
        isShowHeader: true
    },
    {
        path: "/signup",
        page: SignUp,
        isShowHeader: true
    },
    {
        path: "/detailproduct/:id",
        page: DetailProduct,
        isShowHeader: true
    },{
        path: "/products",
        page: Products,
        isShowHeader: true
    }, {
        path: "/user",
        page: User,
        isShowHeader: true,
        outlet: [
            {
                path: "ordersuccess",
                page: OrderSuccess
            },
            {
                path: "orderfail",
                page: OrderFail
            },
            {
                path: "orderdetail/:id",
                page: OrderDetail
            },
            {
                path: "profile",
                page: Profile
            },
        ]
    }, {
        path: "/cart",
        page: Cart,
        isShowHeader: true
    }, {
        path: "/admin",
        page: AdminPage,
        isShowHeader: false,
        outlet: [
            {
                path: "TKProduct",
                page: TKProduct
            },
            {
                path: "TKDay",
                page: TKDay
            }, {
                path: "products",
                page: ProductsAdmin
            }, {
                path: "all-product",
                page: AllProduct
            }, {
                path: "update-product",
                page: UpdateProduct
            }, {
                path: "add-product",
                page: AddProduct
            }, {
                path: "all-user",
                page: AllUser
            }, {
                path: "update-user",
                page: UpdateUser
            }, {
                path: "add-user",
                page: AddUser
            }, {
                path: "billing",
                page: BillingAdmin
            },
            {
                path: "billing/updateOrder/:id",
                page: UpdateOrder
            },
            {
                path: "warranty",
                page: Warranty
            },
            {
                path: "registration",
                page: Registration
            },
        ]
    }, {
        path: "/search/:id",
        page: Search,
        isShowHeader: true
    },
    {
        path: "/*",
        page: NotFound,
        isShowHeader: false
    },
]
