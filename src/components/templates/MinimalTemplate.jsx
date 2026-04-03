const MinimalTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 px-6 md:px-10 py-10 font-light tracking-wide">

      {/* HEADER */}
      <header className="border-b pb-6 mb-10">
        <h1
          className="text-4xl font-semibold mb-3 leading-tight"
          style={{ color: accentColor }}
        >
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-gray-700">
          {data.personal_info?.email && <span>{data.personal_info.email}</span>}
          {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
          {data.personal_info?.location && <span>{data.personal_info.location}</span>}
          {data.personal_info?.linkedin && <span className="break-all">{data.personal_info.linkedin}</span>}
          {data.personal_info?.website && <span className="break-all">{data.personal_info.website}</span>}
        </div>
      </header>

      {/* SUMMARY*/}
      {data.professional_summary && (
        <section className="mb-12">
          <h2
            className="text-sm uppercase font-semibold tracking-widest mb-4 opacity-80"
            style={{ color: accentColor }}
          >
            Professional Summary
          </h2>

          <p className="text-gray-800 leading-relaxed text-[15px]">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/*EXPERIENCE*/}
      {data.experience?.length > 0 && (
        <section className="mb-12">
          <h2
            className="text-sm uppercase font-semibold tracking-widest mb-6 opacity-80"
            style={{ color: accentColor }}
          >
            Experience
          </h2>

          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div key={index} className="space-y-2">

                {/* Title + Dates */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <h3 className="text-[18px] font-semibold">{exp.position}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(exp.start_date)} —{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>

                {/* Company */}
                <p className="text-gray-600 text-[15px]">{exp.company}</p>

                {/* Description */}
                {exp.description && (
                  <div className="text-gray-800 leading-relaxed whitespace-pre-line text-[15px]">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/*PROJECTS*/}
      {data.projects?.length > 0 && (
        <section className="mb-12">
          <h2
            className="text-sm uppercase font-semibold tracking-widest mb-6 opacity-80"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          <div className="space-y-8">
            {data.projects.map((project, index) => (
              <div key={index} className="space-y-2">

                <div className="flex justify-between items-start">
                  <h3 className="text-[18px] font-semibold">{project.title}</h3>

                  {project.link && (
                    <a
                      href={project.link}
                      className="text-sm text-blue-600 hover:underline break-all"
                    >
                      View Project
                    </a>
                  )}
                </div>

                {project.technologies && (
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Tech:</span> {project.technologies}
                  </p>
                )}

                {project.description && (
                  <p className="text-gray-800 leading-relaxed text-[15px]">
                    {project.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <section className="mb-12">
          <h2
            className="text-sm uppercase font-semibold tracking-widest mb-6 opacity-80"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          <div className="space-y-8">
            {data.education.map((edu, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:justify-between">

                <div>
                  <h3 className="text-[17px] font-semibold">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700 text-[15px]">{edu.institution}</p>

                  {edu.gpa && (
                    <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
                  )}
                </div>

                <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                  {formatDate(edu.graduation_date)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SKILLS */}
      {data.skills?.length > 0 && (
        <section>
          <h2
            className="text-sm uppercase font-semibold tracking-widest mb-6 opacity-80"
            style={{ color: accentColor }}
          >
            Skills
          </h2>

          <div className="flex flex-wrap gap-3 text-[15px]">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-md border text-gray-800 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default MinimalTemplate;