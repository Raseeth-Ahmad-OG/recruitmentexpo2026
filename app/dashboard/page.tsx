"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { loadApplications, type CandidateApplication } from "../lib/applications";

const DashboardPage = () => {
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setApplications(loadApplications());
  }, []);

  const filteredApplications = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return applications;
    }

    return applications.filter((application) => {
      const haystack = [
        application.firstName,
        application.lastName,
        application.email,
        application.jobTitle,
        application.company,
        application.skills,
        application.city,
        application.country,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [applications, query]);

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-indigo-400">
              Recruitment dashboard
            </p>
            <h1 className="text-3xl font-semibold">Candidate applications</h1>
            <p className="mt-2 text-sm text-slate-400">
              Search submitted forms by name, email, role, company, or skills.
            </p>
          </div>
          <Link
            href="/expoform"
            className="inline-flex items-center justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
          >
            Open form
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-2xl">
          <label htmlFor="search" className="mb-2 block text-sm font-medium text-slate-200">
            Search applications
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by name, email, role, company, or skills"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-400 focus:border-indigo-500"
          />
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-2xl">
          <div className="border-b border-white/10 px-4 py-3 text-sm text-slate-400">
            Showing {filteredApplications.length} result{filteredApplications.length === 1 ? "" : "s"}
          </div>

          {filteredApplications.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              No matching applications found.
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {filteredApplications.map((application) => (
                <article key={application.id} className="p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {application.firstName} {application.lastName}
                      </h2>
                      <p className="text-sm text-slate-400">{application.email}</p>
                      <p className="mt-2 text-sm text-indigo-300">
                        {application.jobTitle || "Role not provided"} at {application.company || "company not provided"}
                      </p>
                    </div>
                    <div className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-indigo-300">
                      {application.submittedAt}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-3">
                    <div>
                      <p className="font-medium text-slate-200">Location</p>
                      <p>{application.city || "—"}, {application.country || "—"}</p>
                    </div>
                    <div>
                      <p className="font-medium text-slate-200">Skills</p>
                      <p>{application.skills || "—"}</p>
                    </div>
                    <div>
                      <p className="font-medium text-slate-200">Education</p>
                      <p>{application.degree || "—"}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
