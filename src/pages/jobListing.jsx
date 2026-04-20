import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import JobCard from "@/components/job-card";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const { data: companies, fn: fnCompanies } = useFetch(getCompanies);

  const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });

  useEffect(() => {
    if (isLoaded) fnCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  const hasFilters = searchQuery || company_id || location;

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#00e5ff" />;
  }

  return (
    <div className="py-8">

      {/* Page header */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] text-cyan-500/55 uppercase mb-3 font-medium">
          Opportunities
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          <span className="text-white/88">Latest </span>
          <span className="gradient-title">Jobs</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-3">
          {jobs?.length
            ? `${jobs.length} position${jobs.length !== 1 ? "s" : ""} available`
            : "Browse all open positions"}
        </p>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-5">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60"
          />
          <input
            type="text"
            placeholder="Search by title, skill, or keyword..."
            name="search-query"
            className="w-full h-11 pl-10 pr-4 text-sm bg-white/[0.03] border border-white/[0.07] rounded-lg text-white/90 placeholder:text-muted-foreground/50 focus:outline-none focus:border-cyan-500/35 focus:bg-white/[0.05] transition-all duration-200"
          />
        </div>
        <button
          type="submit"
          id="search-btn"
          className="px-5 h-11 text-sm font-semibold bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors duration-200"
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 20px rgba(0,229,255,0.3)"}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
        >
          Search
        </button>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60 mr-1">
          <SlidersHorizontal size={12} />
          <span>Filter</span>
        </div>

        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-44 h-9 text-xs border-white/[0.07] bg-white/[0.02] focus:ring-0 focus:border-white/20">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => (
                <SelectItem key={name} value={name} className="text-xs">
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={company_id} onValueChange={setCompany_id}>
          <SelectTrigger className="w-44 h-9 text-xs border-white/[0.07] bg-white/[0.02] focus:ring-0 focus:border-white/20">
            <SelectValue placeholder="All Companies" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => (
                <SelectItem key={name} value={id} className="text-xs">
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 h-9 text-xs text-red-400/60 border border-red-500/15 rounded-md hover:bg-red-500/5 hover:border-red-500/25 hover:text-red-400 transition-all duration-200"
          >
            <X size={11} />
            Clear
          </button>
        )}
      </div>

      {/* Loading */}
      {loadingJobs && (
        <BarLoader className="mb-6 rounded" width={"100%"} color="#00e5ff" />
      )}

      {/* Job grid */}
      {loadingJobs === false && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                savedInit={job?.saved?.length > 0}
              />
            ))
          ) : (
            <div className="col-span-full py-24 text-center">
              <p className="text-muted-foreground/60 text-sm">
                No positions found. Try adjusting your filters.
              </p>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-3 text-xs text-cyan-400/70 hover:text-cyan-400 transition-colors"
                >
                  Clear all filters →
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
