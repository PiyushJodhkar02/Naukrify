/* eslint-disable react/prop-types */
import { Heart, MapPinIcon, Trash2Icon, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { deleteJob, saveJob } from "@/api/apiJobs";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobCard = ({
  job,
  savedInit = false,
  onJobAction = () => {},
  isMyJob = false,
}) => {
  const [saved, setSaved] = useState(savedInit);
  const { user } = useUser();

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const {
    loading: loadingSavedJob,
    data: savedJob,
    fn: fnSavedJob,
  } = useFetch(saveJob);

  const handleSaveJob = async () => {
    await fnSavedJob(
      { alreadySaved: saved },
      {
        user_id: user.id,
        job_id: job.id,
      }
    );
    onJobAction();
  };

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobAction();
  };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  const descPreview = job.description
    ? job.description.substring(0, job.description.indexOf(".") + 1) ||
      job.description.substring(0, 100) + "..."
    : "";

  return (
    <div className="group relative flex flex-col rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
      style={{ boxShadow: "0 0 0 transparent" }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 30px rgba(0,229,255,0.05)"}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 0 0 transparent"}
    >
      {/* Loading bar */}
      {loadingDeleteJob && (
        <div className="absolute top-0 left-0 right-0">
          <BarLoader width={"100%"} color="#00e5ff" height={2} />
        </div>
      )}

      {/* Top glow accent on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-5 flex flex-col gap-4 flex-1">

        {/* Card header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white/88 text-[15px] leading-snug truncate group-hover:text-white transition-colors">
              {job.title}
            </h3>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
              <MapPinIcon size={11} />
              <span>{job.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {job.company && (
              <img
                src={job.company.logo_url}
                className="h-7 w-auto object-contain opacity-70"
                alt={job.company.name}
              />
            )}
            {isMyJob && (
              <button
                onClick={handleDeleteJob}
                className="p-1.5 rounded-md text-red-400/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
              >
                <Trash2Icon size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.05]" />

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-3">
          {descPreview}
        </p>

        {/* Status badge */}
        <div>
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md border ${
              job.isOpen
                ? "bg-emerald-500/8 text-emerald-400 border-emerald-500/20"
                : "bg-red-500/8 text-red-400 border-red-500/20"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                job.isOpen ? "bg-emerald-400" : "bg-red-400"
              }`}
            />
            {job.isOpen ? "Actively Hiring" : "Position Closed"}
          </span>
        </div>
      </div>

      {/* Footer actions */}
      <div className="px-5 pb-5 flex items-center gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <button className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium border border-white/[0.08] text-white/55 rounded-lg hover:border-cyan-500/25 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all duration-200">
            View Details
            <ArrowUpRight size={11} />
          </button>
        </Link>
        {!isMyJob && (
          <button
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
            className={`p-2 rounded-lg border transition-all duration-200 ${
              saved
                ? "border-red-500/25 bg-red-500/10 text-red-400"
                : "border-white/[0.08] text-white/35 hover:border-red-500/20 hover:text-red-400 hover:bg-red-500/5"
            }`}
          >
            <Heart size={14} fill={saved ? "currentColor" : "none"} />
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
