import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";

import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import Games from "./pages/Games/Games";
import Wallet from "./pages/Wallet/Wallet";
import Rewards from "./pages/Rewards/Rewards";
import Courses from "./pages/Courses/Courses";               
import CourseDetails from "./pages/Courses/CourseDetails";   
import CourseContinue from "./pages/Courses/CourseContinue"; 

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { WalletProvider } from "./context/WalletContext";

function Page({ children, id }) {
  return (
    <motion.main
      key={id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="container-page py-6"
    >
      {children}
    </motion.main>
  );
}

export default function App() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <WalletProvider>
          <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
            {/* pass toggle handler to Navbar */}
            <Navbar onToggleSidebar={() => setSidebarOpen((p) => !p)} />

            <div className="relative">
              <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

              {/* main area; shifts on lg where sidebar is fixed width */}
              <div className="lg:ms-64 transition-all duration-300">
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Page id="dashboard"><Dashboard /></Page>} />
                    <Route path="/profile" element={<Page id="profile"><Profile /></Page>} />
                    <Route path="/games" element={<Page id="games"><Games /></Page>} />
                    <Route path="/wallet" element={<Page id="wallet"><Wallet /></Page>} />
                    <Route path="/rewards" element={<Page id="rewards"><Rewards /></Page>} />

                    {/* courses hub + subroutes */}
                    <Route path="/courses" element={<Page id="courses"><Courses /></Page>} />
                    <Route path="/courses/:id/details" element={<Page id="course-details"><CourseDetails /></Page>} />
                    <Route path="/courses/:id/continue" element={<Page id="course-continue"><CourseContinue /></Page>} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </AnimatePresence>
              </div>
            </div>

            <Footer />
          </div>
        </WalletProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
