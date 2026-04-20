import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { Search, Building2, ArrowRight } from "lucide-react";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const navigateUser = (currRole) => {
    navigate(currRole === "recruiter" ? "/post-job" : "/jobs");
  };

  const handleRoleSelection = async (role) => {
    await user
      .update({ unsafeMetadata: { role } })
      .then(() => {
        navigateUser(role);
      })
      .catch((err) => {
        console.error("Error updating role:", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigateUser(user.unsafeMetadata.role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#00e5ff" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[82vh]">

      {/* Badge */}
      <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-cyan-500/55 border border-cyan-500/15 px-4 py-2 rounded-full bg-cyan-500/5 mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        Getting Started
      </span>

      {/* Heading */}
      <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-center leading-none mb-2">
        <span className="text-white/88">I am a</span>
        <span className="gradient-title">...</span>
      </h2>
      <p className="text-sm text-muted-foreground mt-3 mb-14 text-center">
        Choose your role to personalize your experience
      </p>

      {/* Role cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-xl">

        {/* Candidate */}
        <button
          id="candidate-btn"
          onClick={() => handleRoleSelection("candidate")}
          className="group relative overflow-hidden flex flex-col items-center gap-5 p-10 rounded-2xl border border-cyan-500/15 bg-cyan-500/4 hover:border-cyan-500/35 hover:bg-cyan-500/8 transition-all duration-300 text-left"
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 40px rgba(0,229,255,0.1)"}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/12 flex items-center justify-center group-hover:bg-cyan-500/22 transition-colors duration-300">
            <Search size={24} className="text-cyan-400" />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-white/90 mb-1">Candidate</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Discover opportunities and grow your career
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs text-cyan-400/50 group-hover:text-cyan-400/80 transition-colors">
            Get started <ArrowRight size={11} />
          </div>
        </button>

        {/* Recruiter */}
        <button
          id="recruiter-btn"
          onClick={() => handleRoleSelection("recruiter")}
          className="group relative overflow-hidden flex flex-col items-center gap-5 p-10 rounded-2xl border border-violet-500/15 bg-violet-500/4 hover:border-violet-500/35 hover:bg-violet-500/8 transition-all duration-300 text-left"
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 40px rgba(124,58,237,0.1)"}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="w-14 h-14 rounded-2xl bg-violet-500/12 flex items-center justify-center group-hover:bg-violet-500/22 transition-colors duration-300">
            <Building2 size={24} className="text-violet-400" />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-white/90 mb-1">Recruiter</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Post jobs and find the perfect candidate
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs text-violet-400/50 group-hover:text-violet-400/80 transition-colors">
            Get started <ArrowRight size={11} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
