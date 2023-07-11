import { BrowserRouter as Router, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

//COMPONENTS
import { Footer, Navbar, ResetPassword, ScrollToTop, Sms } from "./components";

//USER INTERFACE
import { ChosenPosts, Foto, FotoRead, Home, NoticeCreate, NoticeRead, Notices, NotificationRead, Notifications, Offical, OfficalExpired, OfficalFollow, OfficalSelf, PostAdd, PostRead, Posts, Profile, ProfileBloked, ProfileWallet, Search, TopList, Video } from "./pages/site";

//OTHERS
import { AuthContext } from "./context/AuthContext";
import ThemeContextProvider from "./context/ThemeContext";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

const App = () => {

    const [authState, setAuthState] = useState({
        name: "",
        id: 0,
        status: false,
        role: "Guest",
    });

    useEffect(() => {
        try {
            const token = localStorage.getItem("accessToken");
            const res = jwtDecode(token);
            setAuthState({
                name: res.name,
                id: res.id,
                status: true,
                role: res.subscription_type.type,
            });
        } catch (error) {
            setAuthState({ ...authState, status: false, role: "Guest" });
        }
    }, []);

    return (
        <>
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <ThemeContextProvider>
                    <Router>
                        <ScrollToTop />
                        <Toaster />
                        <Routes>
                            <Route path="/" element={<HomeLayout />}>
                                <Route path="/" element={<Home />} />

                                <Route path="/gozle" element={<Search />} />

                                {
                                    !authState.status
                                    &&
                                    <>
                                        <Route path="/sms" element={<Sms />} />
                                        <Route path="/reset-password" element={<ResetPassword />} />
                                    </>
                                }

                                <Route path="/foto" element={<Foto />} />
                                <Route path="/foto/:fotoId" element={<FotoRead />} />

                                <Route path="/video" element={<Video />} />

                                <Route path="/saylananlar" element={<ChosenPosts />} />
                                <Route path="/arzanladyslar" element={<Posts />} />
                                <Route path="/arzanladys/:postId" element={<PostRead />} />

                                <Route path="/top-list" element={<TopList />} />
                                <Route path="/post-gosmak" element={<PostAdd />} />

                                {
                                    authState.role === "USER"
                                    &&
                                    <>
                                        <Route path="/profile" element={<Profile />} />
                                        <Route path="/profile/wallet" element={<ProfileWallet />} />
                                        <Route path="/profile/bloked" element={<ProfileBloked />} />
                                    </>
                                }


                                {
                                    authState.role === "OFFICAL"
                                    &&
                                    <>
                                        <Route path="/offical" element={<Offical />} />
                                        <Route path="/offical/follow" element={<OfficalFollow />} />
                                        <Route path="/offical/expired" element={<OfficalExpired />} />
                                        <Route path="/offical/self" element={<OfficalSelf />} />
                                    </>
                                }


                                <Route path="/bildirisler" element={<Notifications />} />
                                <Route path="/bildiris/:notificationId" element={<NotificationRead />} />

                                <Route path="/habarnamalar" element={<Notices />} />
                                <Route path="/habarnama/:noticeId" element={<NoticeRead />} />
                                <Route path="/habarnama-gos" element={<NoticeCreate />} />
                            </Route>
                        </Routes>
                    </Router>
                </ThemeContextProvider>
            </AuthContext.Provider>
        </>
    );
};

const HomeLayout = () => {
    return (
        <>
            <Navbar />

            <Outlet />

            <Footer />
        </>
    );
};

export default App;
