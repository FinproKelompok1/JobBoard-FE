import { useState, useCallback, useEffect } from "react";
import { Job } from "@/types/jobdis";
import { discoverJobs } from "@/libs/jobdis";

interface FetchJobsParams {
  sort?: string;
  order?: string;
  searchTerm?: string;
  category?: string;
  province?: string;
  city?: string;
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobs = useCallback(async (params?: FetchJobsParams) => {
    try {
      setIsLoading(true);

      const finalParams = {
        sort: "createdAt",
        order: "desc",
        ...params,
      };

      const jobsData = await discoverJobs(finalParams);
      setJobs(jobsData || []);
    } catch {
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { jobs, isLoading, fetchJobs };
}
