/* eslint-disable react/prop-types */
import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { updateApplicationStatus } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const statusColors = {
  applied: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  interviewing: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  hired: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  rejected: "text-red-400 bg-red-500/10 border-red-500/20",
};

const ApplicationCard = ({ application, isCandidate = false }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplicationStatus,
    { job_id: application.job_id }
  );

  const handleStatusChange = (status) => {
    fnHiringStatus(status).then(() => fnHiringStatus());
  };

  return (
    <div className="group rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.035] transition-all duration-300 overflow-hidden">
      {loadingHiringStatus && (
        <BarLoader width={"100%"} color="#00e5ff" height={2} />
      )}

      <div className="p-5 flex flex-col gap-4">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white/88 text-sm leading-snug">
              {isCandidate
                ? `${application?.job?.title} at ${application?.job?.company?.name}`
                : application?.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Applied {new Date(application?.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="p-2 rounded-lg border border-white/[0.07] text-muted-foreground hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all duration-200 flex-shrink-0"
            title="Download Resume"
          >
            <Download size={13} />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.05]" />

        {/* Details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
              <BriefcaseBusiness size={12} className="text-cyan-400/70" />
            </div>
            <span className="text-xs text-muted-foreground">
              {application?.experience} yr{application?.experience !== 1 ? "s" : ""} exp
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-violet-500/10 flex items-center justify-center flex-shrink-0">
              <School size={12} className="text-violet-400/70" />
            </div>
            <span className="text-xs text-muted-foreground truncate">
              {application?.education}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
              <Boxes size={12} className="text-cyan-400/70" />
            </div>
            <span className="text-xs text-muted-foreground truncate">
              {application?.skills}
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between pt-1">
          {isCandidate ? (
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md border capitalize ${
                statusColors[application.status] || statusColors.applied
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {application.status}
            </span>
          ) : (
            <Select
              onValueChange={handleStatusChange}
              defaultValue={application.status}
            >
              <SelectTrigger className="w-44 h-8 text-xs border-white/[0.07] bg-white/[0.02] focus:ring-0">
                <SelectValue placeholder="Update Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applied" className="text-xs">Applied</SelectItem>
                <SelectItem value="interviewing" className="text-xs">Interviewing</SelectItem>
                <SelectItem value="hired" className="text-xs">Hired</SelectItem>
                <SelectItem value="rejected" className="text-xs">Rejected</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
