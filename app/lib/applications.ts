export type CandidateApplication = {
  id: string;
  submittedAt: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  nationality: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  linkedin: string;
  degree: string;
  institution: string;
  fieldOfStudy: string;
  graduationYear: string;
  gpa: string;
  jobTitle: string;
  company: string;
  experienceYears: string;
  skills: string;
  responsibilities: string;
  resumeName: string | null;
  coverLetter: string;
};

export type CandidateApplicationForm = CandidateApplication & {
  resume: File | null;
};

const STORAGE_KEY = "candidate-applications";

export const loadApplications = (): CandidateApplication[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    if (!storedValue) return [];

    const parsed = JSON.parse(storedValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveApplications = (applications: CandidateApplication[]) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
};

export const addApplication = (application: CandidateApplication) => {
  const currentApplications = loadApplications();
  const nextApplications = [application, ...currentApplications];
  saveApplications(nextApplications);
  return nextApplications;
};
