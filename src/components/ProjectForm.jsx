import { Plus, Trash2, FolderIcon } from "lucide-react";
import React from "react";

const ProjectForm = ({ data = [], onChange }) => {

   const addProject = () => {
    onChange([
      ...data,
      {
        title: "",
        description: "",
        technologies: "",
        link: "",
      },
    ]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <FolderIcon className="w-5 h-5" />
            Projects
          </h3>
          <p className="text-sm text-gray-500">Add your projects</p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="flex items-center text-white gap-2 px-4 py-2 justify-center text-sm bg-blue-600 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FolderIcon className="w-10 h-10 mx-auto mb-2 text-gray-300" />
          <p>No projects added yet</p>
          <p className="text-sm">Click “Add Project” to begin</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-4 sm:p-5 border border-gray-200 rounded-xl space-y-4 bg-white"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-900">Project #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) =>
                    updateProject(index, "title", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border  border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <input
                  type="text"
                  placeholder="Technologies Used"
                  value={project.technologies}
                  onChange={(e) =>
                    updateProject(index, "technologies", e.target.value)
                  }
                  className=" px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <textarea
                  placeholder="Project Description"
                  rows={3}
                  value={project.description}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  className=" sm:col-span-2  px-3 py-2 text-sm rounded-lg border resize-none border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <input
                  type="url"
                  placeholder="Project Link (optional)"
                  value={project.link}
                  onChange={(e) =>
                    updateProject(index, "link", e.target.value)
                  }
                  className="sm:col-span-2 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
