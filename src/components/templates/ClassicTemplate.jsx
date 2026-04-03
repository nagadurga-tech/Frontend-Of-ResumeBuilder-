import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 leading-relaxed
      p-4 sm:p-6 md:p-8">

      {/* HEADER */}
      <header
        className="text-center mb-6 pb-4 border-b-2"
        style={{ borderColor: accentColor }}
      >
        <h1
          className="text-2xl sm:text-3xl font-bold mb-2"
          style={{ color: accentColor }}
        >
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-600">
          {data.personal_info?.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span className="break-all">{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <span className="break-all">
                {data.personal_info.linkedin}
              </span>
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span className="break-all">
                {data.personal_info.website}
              </span>
            </div>
          )}
        </div>
      </header>

      {/*SUMMARY */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2
            className="text-lg sm:text-xl font-semibold mb-2"
            style={{ color: accentColor }}
          >
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700">{data.professional_summary}</p>
        </section>
      )}

      {/*EXPERIENCE*/}
      {data.experience?.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-lg sm:text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            PROFESSIONAL EXPERIENCE
          </h2>

          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="border-l-4 pl-4"
                style={{ borderColor: accentColor }}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <div>
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p className="text-gray-700">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {formatDate(exp.start_date)} –{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </p>
                </div>

                {exp.description && (
                  <p className="mt-2 text-gray-700 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/*PROJECTS*/}
      {data.projects?.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-lg sm:text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            PROJECTS
          </h2>

          <div className="space-y-3">
            {data.projects.map((proj, index) => (
              <div
                key={index}
                className="border-l-4 pl-4"
                style={{ borderColor: accentColor }}
              >
                <h3 className="font-semibold">{proj.title}</h3>

                {proj.technologies && (
                  <p className="text-sm text-gray-600">
                    <strong>Tech:</strong> {proj.technologies}
                  </p>
                )}

                {proj.description && (
                  <p className="text-gray-700 mt-1">{proj.description}</p>
                )}

                {proj.link && (
                  <a
                    href={proj.link}
                    className="text-sm text-blue-600 break-all hover:underline"
                  >
                    {proj.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/*EDUCATION*/}
      {data.education?.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-lg sm:text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            EDUCATION
          </h2>

          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:justify-between"
              >
                <div>
                  <h3 className="font-semibold">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {formatDate(edu.graduation_date)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/*SKILLS*/}
      {data.skills?.length > 0 && (
        <section>
          <h2
            className="text-lg sm:text-xl font-semibold mb-3"
            style={{ color: accentColor }}
          >
            CORE SKILLS
          </h2>

          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
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

export default ClassicTemplate;
