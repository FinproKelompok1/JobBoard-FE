import { useState, useCallback } from "react";
import { Job } from "@/types/jobdis";
import { getAllJobs } from "@/libs/jobdis";

interface FilterParams {
  searchTerm?: string;
  category?: string;
  province?: string;
  city?: string;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const useAllJobs = (initialLimit: number = 3) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: initialLimit,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const fetchJobs = useCallback(
    async (
      filters: FilterParams = {},
      page: number = 1,
      limit: number = initialLimit,
      sort: string = "createdAt",
      order: "asc" | "desc" = "desc",
    ) => {
      setIsLoading(true);

      try {
        const params = {
          searchTerm: filters.searchTerm,
          city: filters.city,
          province: filters.province,
          category: filters.category,
          page,
          limit,
          sort,
          order,
        };

        const response = await getAllJobs(params);

        setJobs(response.jobs);
        setPagination(response.pagination);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          itemsPerPage: initialLimit,
          hasNextPage: false,
          hasPrevPage: false,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [initialLimit],
  );

  const changePage = useCallback(
    (newPage: number, filters: FilterParams = {}) => {
      fetchJobs(filters, newPage, pagination.itemsPerPage);
    },
    [fetchJobs, pagination.itemsPerPage],
  );

  return {
    jobs,
    isLoading,
    pagination,
    fetchJobs,
    changePage,
  };
};
