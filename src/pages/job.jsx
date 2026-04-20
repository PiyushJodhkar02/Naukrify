import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplyJobDrawer } from "@/components/apply-job";
import ApplicationCard from "@/components/application-card";
import useFetch from "@/hooks/use-fetch";
import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";

const JobPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, { job_id: id });

  useEffect(() => {
    if (isLoaded) fnJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    { job_id: id }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#00e5ff" />;
  }

  const isRecruiter = job?.recruiter_id === user?.id;

  return (
    <div className="flex flex-col gap-8 py-8">

      {/* ── Job Header ── */}
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-start">
        <div>
          <p className="text-xs tracking-[0.25em] text-cyan-500/55 uppercase mb-3 font-medium">
            {job?.company?.name}
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white/90 gradient-title">
            {job?.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPinIcon size={14} className="text-cyan-500/60" />
              {job?.location}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Briefcase size={14} className="text-violet-500/60" />
              {job?.applications?.length} Applicant{job?.applications?.length !== 1 ? "s" : ""}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border ${
                job?.isOpen
                  ? "bg-emerald-500/8 text-emerald-400 border-emerald-500/20"
                  : "bg-red-500/8 text-red-400 border-red-500/20"
              }`}
            >
              {job?.isOpen ? (
                <><DoorOpen size={12} /> Open</>
              ) : (
                <><DoorClosed size={12} /> Closed</>
              )}
            </span>
          </div>
        </div>

        {job?.company?.logo_url && (
          <img
            src={job.company.logo_url}
            className="h-14 w-auto object-contain opacity-80 flex-shrink-0"
            alt={job.company.name}
          />
        )}
      </div>

      {/* ── Hiring Status Toggle (recruiter only) ── */}
      {isRecruiter && (
        <div>
          <p className="text-xs text-muted-foreground/60 mb-2 uppercase tracking-widest">Manage Status</p>
          <Select onValueChange={handleStatusChange}>
            <SelectTrigger
              className={`w-full sm:w-64 h-10 text-sm border transition-colors ${
                job?.isOpen
                  ? "border-emerald-500/25 bg-emerald-500/5 text-emerald-400"
                  : "border-red-500/25 bg-red-500/5 text-red-400"
              }`}
            >
              <SelectValue
                placeholder={`Hiring — ${job?.isOpen ? "Open" : "Closed"}`}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* ── Divider ── */}
      <div className="h-px bg-white/[0.05]" />

      {/* ── About the Job ── */}
      <div>
        <h2 className="text-lg font-semibold text-white/80 mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-cyan-500 rounded-full" />
          About the Role
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{job?.description}</p>
      </div>

      {/* ── Requirements ── */}
      <div>
        <h2 className="text-lg font-semibold text-white/80 mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-violet-500 rounded-full" />
          What We&apos;re Looking For
        </h2>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <MDEditor.Markdown
            source={job?.requirements}
            className="bg-transparent text-sm text-muted-foreground"
          />
        </div>
      </div>

      {/* ── Apply Button (candidate only) ── */}
      {!isRecruiter && (
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
        />
      )}

      {/* ── Hiring status loading ── */}
      {loadingHiringStatus && (
        <BarLoader width={"100%"} color="#00e5ff" height={2} />
      )}

      {/* ── Applications (recruiter only) ── */}
      {job?.applications?.length > 0 && isRecruiter && (
        <div>
          <div className="h-px bg-white/[0.05] mb-8" />
          <h2 className="text-lg font-semibold text-white/80 mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-cyan-500 rounded-full" />
            Applications
            <span className="text-xs font-normal text-muted-foreground ml-1">
              ({job.applications.length})
            </span>
          </h2>
          <div className="flex flex-col gap-3">
            {job.applications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPage;
