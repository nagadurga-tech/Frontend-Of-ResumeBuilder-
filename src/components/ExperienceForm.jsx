import { Plus, Sparkles, Trash2, Briefcase, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api.js";
import { toast } from "react-hot-toast";

const ExperienceForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(-1);

  const addExperience = () => {
    onChange([
      ...data,
      {
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        description: "",
        is_current: false,
      },
    ]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generateDescription = async (index) => {
    try {
      setGeneratingIndex(index);
      const experience = data[index];

      if (!experience.position || !experience.company) {
        toast.error("Please enter company and job title first");
        return;
      }

      const prompt = `
      Create a beginner-friendly job description in 2–3 clear sentences.
      Do NOT exaggerate experience.
      Role: ${experience.position}
      Company: ${experience.company}
      User Input: "${experience.description}"
      Return only the job description text.
      `;

      const res = await api.post(
        "/api/ai/enhance-job-desc",
        { userContent: prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      updateExperience(index, "description", res.data.enhancedContent);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setGeneratingIndex(-1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">
            Add your job roles and responsibilities
          </p>
        </div>

        <button
          onClick={addExperience}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {/* Empty state */}
      {data.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No experience added yet</p>
          <p className="text-sm">Click “Add Experience” to begin</p>
        </div>
      ) : (
        <div className="space-y-5">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-4 sm:p-5 border border-gray-200 rounded-xl space-y-4 bg-white"
            >
              {/* Top Row */}
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-800">
                  Experience #{index + 1}
                </h4>

                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  value={experience.company}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  type="text"
                  placeholder="Company Name"
                  className="px-3 py-2 rounded-lg text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <input
                  value={experience.position}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  type="text"
                  placeholder="Job Title"
                  className="px-3 py-2 rounded-lg text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <div className="flex flex-col">
                  <label className="text-xs text-gray-500">
                    Start Month
                  </label>
                  <input
                    value={experience.start_date}
                    onChange={(e) =>
                      updateExperience(index, "start_date", e.target.value)
                    }
                    type="month"
                    className="px-3 py-2 rounded-lg text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs text-gray-500">
                    End Month
                  </label>
                  <input
                    value={experience.end_date}
                    onChange={(e) =>
                      updateExperience(index, "end_date", e.target.value)
                    }
                    type="month"
                    disabled={experience.is_current}
                    className="px-3 py-2 rounded-lg text-sm border border-gray-300 disabled:bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Checkbox */}
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={experience.is_current}
                  onChange={(e) =>
                    updateExperience(index, "is_current", e.target.checked)
                  }
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="text-sm text-gray-700">
                  Currently working here
                </span>
              </label>

              {/* Job Description */}
              <div className="space-y-2 mt-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>

                  <button
                    type="button"
                    onClick={() => generateDescription(index)}
                    disabled={
                      generatingIndex === index ||
                      !experience.position ||
                      !experience.company
                    }
                    className="self-start sm:self-auto flex items-center gap-1 px-3 py-2 text-xs sm:text-sm bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition disabled:opacity-50"
                  >
                    {generatingIndex === index ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}
                    Enhance with AI
                  </button>
                </div>

                <textarea
                  value={experience.description}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  rows={4}
                  placeholder="Write your key responsibilities or let AI generate it..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 resize-none outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;