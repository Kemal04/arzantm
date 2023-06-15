import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom'

//COMPONENTS
import { Footer, Navbar, ScrollToTop } from "./components"

//USER INTERFACE
import { Foto, FotoRead, Home, NoticeCreate, NoticeRead, Notices, NotificationRead, Notifications, Offical, OfficalExpired, OfficalFollow, OfficalSelf, PostAdd, Profile, ProfileBloked, ProfileWallet, TopList, Video } from "./pages/site"

//OTHERS
import { ToastContainer } from "react-toastify"
import ThemeContextProvider from "./context/ThemeContext"
import './App.css'

const App = () => {
    return (
        <>
            {/* <AuthContext.Provider value={{ authState, setAuthState }}> */}
            <ThemeContextProvider>
                <Router>
                    <ScrollToTop />
                    <ToastContainer />
                    <Routes>

                        <Route path='/' element={<HomeLayout />} >
                            <Route path='/' element={<Home />} />

                            <Route path='/foto' element={<Foto />} />
                            <Route path='/foto/arzanTm' element={<FotoRead />} />

                            <Route path='/video' element={<Video />} />

                            <Route path='/top-list' element={<TopList />} />

                            <Route path='/profile' element={<Profile />} />
                            <Route path='/profile/wallet' element={<ProfileWallet />} />
                            <Route path='/profile/bloked' element={<ProfileBloked />} />

                            <Route path='/offical' element={<Offical />} />
                            <Route path='/offical/follow' element={<OfficalFollow />} />
                            <Route path='/offical/expired' element={<OfficalExpired />} />
                            <Route path='/offical/self' element={<OfficalSelf />} />

                            <Route path='/post-gosmak' element={<PostAdd />} />

                            <Route path='/bildirisler' element={<Notifications />} />
                            <Route path='/bildiris/:notificationId' element={<NotificationRead />} />

                            <Route path='/habarnamalar' element={<Notices />} />
                            <Route path='/habarnama/:noticeId' element={<NoticeRead />} />
                            <Route path='/habarnama-gos' element={<NoticeCreate />} />
                        </Route>

                        {/* <Route path='/admin' element={<AdminLayout />} >
                            <Route path='' element={<Admin />} />

                            <Route path='offical/users' element={<AdminOffical />} />
                            <Route path='users' element={<AdminUsers />} />
                            <Route path='top-users' element={<AdminTopUsers />} />
                            <Route path='user-create' element={<AdminUserCreate />} />
                            <Route path='user-edit/:user_id' element={<AdminUserEdit />} />

                            <Route path='discounts' element={<AdminDiscounts />} />
                            <Route path='discount-create' element={<AdminDiscountCreate />} />
                            <Route path='discount-edit/:discountId' element={<AdminDiscountEdit />} />

                            <Route path='gallery/photo' element={<AdminPhoto />} />
                            <Route path='gallery/photo-create' element={<AdminPhotoCreate />} />
                            <Route path='gallery/video' element={<AdminVideo />} />
                            <Route path='gallery/video-create' element={<AdminVideoCreate />} />

                            <Route path='web/banners' element={<AdminWebBanners />} />
                            <Route path='web/banner-create' element={<AdminWebBannerCreate />} />
                            <Route path='web/banner-edit/:bannerId' element={<AdminWebBannerEdit />} />

                            <Route path='web/categories' element={<AdminWebCategory />} />
                            <Route path='web/category-create' element={<AdminWebCategoryCreate />} />

                            <Route path='app/banners' element={<AdminAppBanners />} />
                            <Route path='app/banner-create' element={<AdminAppBannerCreate />} />

                            <Route path='app/categories' element={<AdminAppCategory />} />
                            <Route path='app/category-create' element={<AdminAppCategoryCreate />} />
                        </Route> */}

                        {/* <Route path='/admin/login' element={<AdminLogin />} /> */}

                    </Routes>
                </Router>
            </ThemeContextProvider>
            {/* </AuthContext.Provider> */}
        </>
    )
}

const HomeLayout = () => {
    return (
        <>
            <Navbar />

            <Outlet />

            <Footer />
        </>
    );
};

export default App