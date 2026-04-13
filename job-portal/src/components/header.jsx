import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox, BookOpen } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center border-b border-white/[0.05]">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.png" className="h-16 py-1" alt="Naukrify Logo" />
        </Link>

        {/* Nav actions */}
        <div className="flex items-center gap-3">
          <SignedOut>
            <button
              id="login-btn"
              onClick={() => setShowSignIn(true)}
              className="px-5 py-2 text-sm font-medium border border-cyan-500/30 text-cyan-400/90 rounded-md hover:bg-cyan-500/10 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-200"
              style={{ boxShadow: "0 0 0 0 transparent" }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 18px rgba(0,229,255,0.15)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 0 0 0 transparent"}
            >
              Login
            </button>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <button
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-violet-500/30 text-violet-400/90 rounded-md hover:bg-violet-500/10 hover:border-violet-400/50 hover:text-violet-300 transition-all duration-200"
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 18px rgba(124,58,237,0.15)"}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 0 0 0 transparent"}
                >
                  <PenBox size={14} />
                  Post a Job
                </button>
              </Link>
            )}

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 ring-1 ring-white/10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
                <UserButton.Link
                  label="Interview Prep"
                  labelIcon={<BookOpen size={15} />}
                  href="/interview-prep"
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/75 backdrop-blur-sm z-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
