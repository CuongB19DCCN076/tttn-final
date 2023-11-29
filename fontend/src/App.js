import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { Fragment, useEffect } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// eslint-disable-next-line no-unused-vars
import {Chart} from "chart.js/auto"
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { updateUser } from './redux/slides/userSlide';
import { updateCart } from './redux/slides/cartSlide';

function App() {
  const dispatch = useDispatch();
	useEffect(() => { // Khi chuyển đường dẫn xong, cuộn lên đầu trang
		const fetchData = async () =>{
			try{
				const email = localStorage.getItem("email");
				const password = localStorage.getItem("password");
				const res = await axios.post("https://localhost:7067/api/Member/login", {email, password});
				const isAdmin = await axios.get(`https://localhost:7067/api/Member/check/${res.data?.data.id}`)
				const idCartData = await axios.get(`https://localhost:7067/api/Cart/getCart/${res.data?.data.id}`)
           		 const idCart =  idCartData.data.data.id;
               const admin = isAdmin && isAdmin.data.data 
				if(res.status === 200){
					dispatch(updateUser({...res.data?.data, isAdmin: admin , idCart}));
				}
				const cartProducts = await axios.get(`https://localhost:7067/api/CartProduct/getAllByMGH/${idCart}`);
				
				if(cartProducts?.status === 200){
					dispatch(updateCart(cartProducts?.data.data));
				}
			}catch(e){
				console.log(e);
			}
		}
		fetchData();
        window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
      <BrowserRouter>
        <Routes>
          {routes.map((item,index) => {
            const path = item.path;
            const Page = item.page;
            const out = item?.outlet ? item?.outlet.map((itemOut,index) => {
              const PageOut = itemOut.page;
              return <Route path={itemOut.path} key={index} element={<PageOut />} />
            }) : null ;
            const Layout = item.isShowHeader ? DefaultComponent : Fragment
            return <Route key={index} path={path} element={
              <Layout>
                <Page />
              </Layout>
            } >
              {out}
            </Route>
          })}
        </Routes>
      </BrowserRouter>
    );
}

export default App;
