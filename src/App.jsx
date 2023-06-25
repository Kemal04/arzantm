import { BrowserRouter as Router, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

//COMPONENTS
import { Footer, Navbar, ScrollToTop } from "./components";

//USER INTERFACE
import { Foto, FotoRead, Home, NoticeCreate, NoticeRead, Notices, NotificationRead, Notifications, Offical, OfficalExpired, OfficalFollow, OfficalSelf, PostAdd, Profile, ProfileBloked, ProfileWallet, TopList, Video } from "./pages/site";

//OTHERS
import { AuthContext } from "./context/AuthContext";
import ThemeContextProvider from "./context/ThemeContext";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const App = () => {

    const [authState, setAuthState] = useState({
        name: "",
        phone: "",
        id: 0,
        status: false,
        role: "Guest",
    });

    useEffect(() => {
        axios.get(`/api/v1/userinformation`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            if (res.data.error) {
                setAuthState({ ...authState, status: false, role: "Guest" });
            } else {
                setAuthState({
                    name: res.data.name,
                    phone: res.data.phone,
                    id: res.data.id,
                    status: true,
                    role: res.data.role,
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

                                <Route path="/foto" element={<Foto />} />
                                <Route path="/foto/arzanTm" element={<FotoRead />} />

                                <Route path="/video" element={<Video />} />

                                <Route path="/top-list" element={<TopList />} />

                                <Route path="/profile" element={<Profile />} />
                                <Route path="/profile/wallet" element={<ProfileWallet />} />
                                <Route path="/profile/bloked" element={<ProfileBloked />} />

                                <Route path="/offical" element={<Offical />} />
                                <Route path="/offical/follow" element={<OfficalFollow />} />
                                <Route path="/offical/expired" element={<OfficalExpired />} />
                                <Route path="/offical/self" element={<OfficalSelf />} />

                                <Route path="/post-gosmak" element={<PostAdd />} />

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
