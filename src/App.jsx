import { BrowserRouter as Router, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

//COMPONENTS
import { Footer, Navbar, ResetPassword, ScrollToTop, Sms } from "./components";

//USER INTERFACE
import { About, ChosenPosts, Contact, FAQ, Foto, FotoRead, Home, NoticeCreate, NoticeRead, Notices, NotificationRead, Notifications, Offical, Payment, PostAdd, PostRead, Posts, Profile, ProfileBloked, ProfileOpenOffical, ProfileService, ProfileStatistika, ProfileWallet, Search, Tags, TermsOfUse, TopList, Video, VideoRead } from "./pages";

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

                                <Route path="/biz-barada" element={<About />} />
                                <Route path="/habarlasmak" element={<Contact />} />
                                <Route path="/faq" element={<FAQ />} />
                                <Route path="/ulanys-kadalary" element={<TermsOfUse />} />

                                <Route path="/gozle" element={<Search />} />

                                {
                                    !authState.status
                                    &&
                                    <>
                                        <Route path="/sms" element={<Sms />} />
                                        <Route path="/reset-password" element={<ResetPassword />} />
                                    </>
                                }

                                {
                                    authState.status
                                    &&
                                    <>
                                        <Route path="/toleg" element={<Payment />} />
                                    </>
                                }

                                <Route path="/foto" element={<Foto />} />
                                <Route path="/foto/:fotoId" element={<FotoRead />} />

                                <Route path="/video" element={<Video />} />

                                <Route path="/saylananlar" element={<ChosenPosts />} />
                                <Route path="/arzanladyslar" element={<Posts />} />
                                <Route path="/arzanladys/:postId" element={<PostRead />} />

                                <Route path="/tags" element={<Tags />} />

                                <Route path="/top-list" element={<TopList />} />
                                <Route path="/post-gosmak" element={<PostAdd />} />

                                <Route path="/resmi-hasaplar" element={<Offical />} />
                                {
                                    authState.status
                                    &&
                                    <>
                                        <Route path="/profile" element={<Profile />} />
                                        <Route path="/profile/hyzmat-satyn-almak" element={<ProfileService />} />
                                        <Route path="/profile/bloked" element={<ProfileBloked />} />
                                        <Route path="/profile/statistika" element={<ProfileStatistika />} />
                                        <Route path="/profile/gapjyk" element={<ProfileWallet />} />
                                        <Route path="/profile/resmi-hasap-ac" element={<ProfileOpenOffical />} />
                                    </>
                                }

                                <Route path="/bildirisler" element={<Notifications />} />
                                <Route path="/bildiris/:notificationId" element={<NotificationRead />} />

                                <Route path="/habarnamalar" element={<Notices />} />
                                <Route path="/habarnama/:noticeId" element={<NoticeRead />} />
                                <Route path="/habarnama-gos" element={<NoticeCreate />} />
                            </Route>

                            <Route path="/video/:videoId" element={<VideoRead />} />
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
