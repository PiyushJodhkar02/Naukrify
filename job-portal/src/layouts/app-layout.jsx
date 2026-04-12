import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <footer className="border-t border-white/[0.05] mt-20 py-10">
        <div className="container flex flex-col items-center gap-3 text-center">
          <img src="/logo.png" className="h-8 opacity-60 mb-2" alt="Naukrify Logo" />
          <p className="text-sm font-medium text-white/80 flex items-center gap-1.5">
            Made with 💗 by <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Piyush Jodhkar</span>
          </p>
          <p className="text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} Naukrify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
