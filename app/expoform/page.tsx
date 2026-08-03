"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TextField from "../components/textfield";
import { addApplication } from "../lib/applications";
import React from "react";

type FormData = {
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
  resume: File | null;
  coverLetter: string;
};

const initialValues: FormData = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  nationality: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  country: "",
  linkedin: "",
  degree: "",
  institution: "",
  fieldOfStudy: "",
  graduationYear: "",
  gpa: "",
  jobTitle: "",
  company: "",
  experienceYears: "",
  skills: "",
  responsibilities: "",
  resume: null,
  coverLetter: "",
};

const requiredFields: Array<keyof FormData> = [
  "firstName",
  "lastName",
  "phone",
  "email",
  "address",
  "city",
  "country",
  "degree",
  "institution",
  "fieldOfStudy",
  "jobTitle",
  "company",
  "skills",
  "responsibilities",
  "resume",
  "coverLetter",
];

const ExpoForm = () => {
  const router = useRouter();
  const [employeeData, setEmployeeData] = useState<FormData>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  const getInputClassName = (field: keyof FormData) =>
    [
      "block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6",
      errors[field] ? "border border-red-500/70 focus:outline-red-500" : "",
    ]
      .join(" ")
      .trim();

  const updateField = (field: keyof FormData, value: string | File | null) => {
    setEmployeeData((prev) => ({ ...prev, [field]: value as never }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateField = (
    field: keyof FormData,
    value: string | File | null,
  ) => {
    if (field === "resume") {
      return value ? "" : "Resume upload is required.";
    }

    if (typeof value !== "string") {
      return "";
    }

    const trimmed = value.trim();

    if (!trimmed) {
      return "This field is required.";
    }

    if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return "Please enter a valid email address.";
    }

    if (field === "phone" && !/^\+?[0-9\s-]{7,15}$/.test(trimmed)) {
      return "Please enter a valid phone number.";
    }

    return "";
  };

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof FormData, string>> = {};

    requiredFields.forEach((field) => {
      const error = validateField(field, employeeData[field]);
      if (error) {
        nextErrors[field] = error;
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleBlur = (field: keyof FormData) => {
    const error = validateField(field, employeeData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      const submittedAt = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      addApplication({
        id: `${Date.now()}`,
        submittedAt,
        ...employeeData,
        resumeName: employeeData.resume?.name ?? null,
      });

      router.push("/dashboard");
    }
  };
  console.log("expoform page rendered");
  return (
    <form
      className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl"
      onSubmit={handleSubmit}
    >
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base/7 font-semibold text-white">
            Personal Information
          </h2>
          <p className="mt-1 text-sm/6 text-gray-400">
            Provide your basic profile details so recruiters can identify you.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <TextField
              label="First name"
              id="first-name"
              name="first-name"
              type="text"
              placeholder="John"
              value={employeeData?.firstName ?? ""}
              error={errors.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              onBlur={() => handleBlur("firstName")}
              containerClassName="sm:col-span-3"
              //   required
            />

            <TextField
              label="Last name"
              id="last-name"
              name="last-name"
              type="text"
              placeholder="Doe"
              value={employeeData.lastName}
              error={errors.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              onBlur={() => handleBlur("lastName")}
              containerClassName="sm:col-span-3"
            />

            <div className="sm:col-span-2">
              <label
                htmlFor="dob"
                className="block text-sm/6 font-medium text-white"
              >
                Date of birth
              </label>
              <div className="mt-2">
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  value={employeeData.dob}
                  onChange={(e) => updateField("dob", e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="gender"
                className="block text-sm/6 font-medium text-white"
              >
                Gender
              </label>
              <div className="mt-2">
                <select
                  id="gender"
                  name="gender"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  value={employeeData.gender}
                  onChange={(e) => updateField("gender", e.target.value)}
                >
                  <option>Prefer not to say</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="nationality"
                className="block text-sm/6 font-medium text-white"
              >
                Nationality
              </label>
              <div className="mt-2">
                <input
                  id="nationality"
                  name="nationality"
                  type="text"
                  placeholder="Sri Lankan"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  value={employeeData.nationality}
                  onChange={(e) => updateField("nationality", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base/7 font-semibold text-white">
            Contact Details
          </h2>
          <p className="mt-1 text-sm/6 text-gray-400">
            Share how recruiters can reach you.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <TextField
              label="Phone number"
              id="phone"
              name="phone"
              type="tel"
              placeholder="+94 77 123 4567"
              value={employeeData.phone}
              error={errors.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              onBlur={() => handleBlur("phone")}
              containerClassName="sm:col-span-3"
            />

            <TextField
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={employeeData.email}
              error={errors.email}
              onChange={(e) => updateField("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              containerClassName="sm:col-span-3"
            />

            <TextField
              label="Address"
              id="address"
              name="address"
              type="text"
              placeholder="123 Main Street"
              value={employeeData.address}
              error={errors.address}
              onChange={(e) => updateField("address", e.target.value)}
              onBlur={() => handleBlur("address")}
              containerClassName="col-span-full"
            />

            <TextField
              label="City"
              id="city"
              name="city"
              type="text"
              placeholder="Colombo"
              value={employeeData.city}
              error={errors.city}
              onChange={(e) => updateField("city", e.target.value)}
              onBlur={() => handleBlur("city")}
              containerClassName="sm:col-span-2"
            />

            <TextField
              label="Country"
              id="country"
              name="country"
              type="text"
              placeholder="Sri Lanka"
              value={employeeData.country}
              error={errors.country}
              onChange={(e) => updateField("country", e.target.value)}
              onBlur={() => handleBlur("country")}
              containerClassName="sm:col-span-2"
            />

            <div className="sm:col-span-2">
              <label
                htmlFor="linkedin"
                className="block text-sm/6 font-medium text-white"
              >
                LinkedIn
              </label>
              <div className="mt-2">
                <input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  value={employeeData.linkedin}
                  onChange={(e) => updateField("linkedin", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base/7 font-semibold text-white">
            Educational Qualifications
          </h2>
          <p className="mt-1 text-sm/6 text-gray-400">
            Add your academic background and certifications.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <TextField
              label="Highest degree"
              id="degree"
              name="degree"
              type="text"
              placeholder="Bachelor of Science"
              value={employeeData.degree}
              error={errors.degree}
              onChange={(e) => updateField("degree", e.target.value)}
              onBlur={() => handleBlur("degree")}
              containerClassName="sm:col-span-3"
            />

            <TextField
              label="Institution"
              id="institution"
              name="institution"
              type="text"
              placeholder="University of Colombo"
              value={employeeData.institution}
              error={errors.institution}
              onChange={(e) => updateField("institution", e.target.value)}
              onBlur={() => handleBlur("institution")}
              containerClassName="sm:col-span-3"
            />

            <TextField
              label="Field of study"
              id="field"
              name="field"
              type="text"
              placeholder="Computer Science"
              value={employeeData.fieldOfStudy}
              error={errors.fieldOfStudy}
              onChange={(e) => updateField("fieldOfStudy", e.target.value)}
              onBlur={() => handleBlur("fieldOfStudy")}
              containerClassName="sm:col-span-2"
            />

            <div className="sm:col-span-2">
              <label
                htmlFor="graduation-year"
                className="block text-sm/6 font-medium text-white"
              >
                Graduation year
              </label>
              <div className="mt-2">
                <input
                  id="graduation-year"
                  name="graduation-year"
                  type="number"
                  placeholder="2024"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  value={employeeData.graduationYear}
                  onChange={(e) =>
                    updateField("graduationYear", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="gpa"
                className="block text-sm/6 font-medium text-white"
              >
                GPA / CGPA
              </label>
              <div className="mt-2">
                <input
                  id="gpa"
                  name="gpa"
                  type="text"
                  placeholder="3.8"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  value={employeeData.gpa}
                  onChange={(e) => updateField("gpa", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base/7 font-semibold text-white">
            Work Experience
          </h2>
          <p className="mt-1 text-sm/6 text-gray-400">
            Highlight your professional background and key responsibilities.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <TextField
              label="Job title"
              id="job-title"
              name="job-title"
              type="text"
              placeholder="Software Engineer"
              value={employeeData.jobTitle}
              error={errors.jobTitle}
              onChange={(e) => updateField("jobTitle", e.target.value)}
              onBlur={() => handleBlur("jobTitle")}
              containerClassName="sm:col-span-3"
            />

            <TextField
              label="Company / Organization"
              id="company"
              name="company"
              type="text"
              placeholder="ABC Tech"
              value={employeeData.company}
              error={errors.company}
              onChange={(e) => updateField("company", e.target.value)}
              onBlur={() => handleBlur("company")}
              containerClassName="sm:col-span-3"
            />

            <div className="sm:col-span-2">
              <label
                htmlFor="experience-years"
                className="block text-sm/6 font-medium text-white"
              >
                Years of experience
              </label>
              <div className="mt-2">
                <input
                  id="experience-years"
                  name="experience-years"
                  type="number"
                  placeholder="3"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  value={employeeData.experienceYears}
                  onChange={(e) =>
                    updateField("experienceYears", e.target.value)
                  }
                />
              </div>
            </div>

            <TextField
              label="Key skills"
              id="skills"
              name="skills"
              type="text"
              placeholder="React, Node.js, SQL"
              value={employeeData.skills}
              error={errors.skills}
              onChange={(e) => updateField("skills", e.target.value)}
              onBlur={() => handleBlur("skills")}
              containerClassName="sm:col-span-4"
            />

            <div className="col-span-full">
              <label
                htmlFor="responsibilities"
                className="block text-sm/6 font-medium text-white"
              >
                Responsibilities / achievements
              </label>
              <div className="mt-2">
                <textarea
                  id="responsibilities"
                  name="responsibilities"
                  rows={4}
                  placeholder="Describe your responsibilities and notable achievements."
                  className={getInputClassName("responsibilities")}
                  value={employeeData.responsibilities}
                  onChange={(e) =>
                    updateField("responsibilities", e.target.value)
                  }
                  onBlur={() => handleBlur("responsibilities")}
                />
                {errors.responsibilities && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.responsibilities}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pb-6">
          <h2 className="text-base/7 font-semibold text-white">
            CV / Resume Upload
          </h2>
          <p className="mt-1 text-sm/6 text-gray-400">
            Upload your resume and add a short cover letter.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="col-span-full">
              <label
                htmlFor="resume"
                className="block text-sm/6 font-medium text-white"
              >
                Upload CV / Resume
              </label>
              <div
                className={`mt-2 flex justify-center rounded-lg border px-6 py-10 ${errors.resume ? "border-red-500/70" : "border-white/25"}`}
              >
                <div className="text-center">
                  <label
                    htmlFor="resume"
                    className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 hover:text-indigo-300 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500"
                  >
                    <span>Upload a PDF or DOCX file</span>
                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      className="sr-only"
                      onChange={(e) =>
                        updateField("resume", e.target.files?.[0] ?? null)
                      }
                      onBlur={() => handleBlur("resume")}
                    />
                  </label>

                  <p className="mt-2 text-xs/5 text-gray-400">
                    PDF, DOC, DOCX up to 5MB
                  </p>
                </div>
              </div>
              {errors.resume && (
                <p className="mt-2 text-sm text-red-400">{errors.resume}</p>
              )}
              {employeeData?.resume && (
                <p className="mt-2 text-sm/6 text-gray-400">
                  Selected file: {employeeData?.resume?.name}
                </p>
              )}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-letter"
                className="block text-sm/6 font-medium text-white"
              >
                Cover letter
              </label>
              <div className="mt-2">
                <textarea
                  id="cover-letter"
                  name="cover-letter"
                  rows={5}
                  placeholder="Write a short introduction about yourself and your career goals."
                  className={getInputClassName("coverLetter")}
                  value={employeeData.coverLetter}
                  onChange={(e) => updateField("coverLetter", e.target.value)}
                  onBlur={() => handleBlur("coverLetter")}
                />
                {errors.coverLetter && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.coverLetter}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-white">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Submit Application
        </button>
      </div>
    </form>
  );
};

export default ExpoForm;
