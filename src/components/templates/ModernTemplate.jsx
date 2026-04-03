import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
  
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="w-full max-w-[850px] mx-auto bg-white text-gray-900 text-[13px] leading-relaxed">

      {/* TOP NAME + CONTACT */}
      <header className="px-6 pt-6 pb-4 border-b border-gray-400">
        <h1 className="text-2xl font-semibold tracking-wide text-center uppercase">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="flex justify-center gap-6 mt-2 text-gray-800 text-[12px]">
          {data.personal_info?.email && (
            <span className="flex items-center gap-1">
              <Mail className="size-3" />
              {data.personal_info.email}
            </span>
          )}
          {data.personal_info?.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="size-3" />
              {data.personal_info.linkedin.replace(/^https?:\/\//, "")}
            </span>
          )}
          {data.personal_info?.website && (
            <span className="flex items-center gap-1">
              <Globe className="size-3" />
              {data.personal_info.website.replace(/^https?:\/\//, "")}
            </span>
          )}
        </div>
      </header>

      {/* BODY */}
      <div className="px-6 py-6 space-y-8">

        {/* SUMMARY */}
        {data.professional_summary && (
          <section>
            <h2
              className="font-semibold text-[15px] mb-1"
              style={{ color: accentColor }}
            >
              Professional Summary
            </h2>
            <p className="text-gray-800">{data.professional_summary}</p>
          </section>
        )}

        {/* EDUCATION */}
        {data.education?.length > 0 && (
          <section>
            <h2 className="font-semibold text-[15px] mb-2" style={{ color: accentColor }}>
              Education
            </h2>

            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={i} className="flex justify-between items-start w-full">
                  <div>
                    <p className="font-semibold">{edu.institution}</p>
                    <p className="italic text-gray-700 text-[13px]">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </p>
                  </div>

                  <div className="text-right text-[12px]">
                    <p>{formatDate(edu.start_date)} – {formatDate(edu.graduation_date)}</p>
                    {edu.gpa && <p>CGPA: {edu.gpa}</p>}
                    {edu.percentage && <p>Percentage: {edu.percentage}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS */}
        {data.skills?.length > 0 && (
          <section>
            <h2 className="font-semibold text-[15px] mb-2" style={{ color: accentColor }}>
              Technical Skills
            </h2>
            <ul className="list-disc ml-4 text-gray-800 space-y-1">
              {data.skills.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </section>
        )}

        {/* INTERNSHIPS */}
        {data.experience?.length > 0 && (
          <section>
            <h2 className="font-semibold text-[15px] mb-2" style={{ color: accentColor }}>
              Internships & Training
            </h2>

            <div className="space-y-5">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{exp.position}</h3>
                      <p className="italic text-gray-700">{exp.company}</p>
                    </div>

                    <div className="text-right text-[12px] text-gray-700">
                      {exp.company_location}
                      <br />
                      {formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </div>
                  </div>

                  {exp.description && (
                    <ul className="list-disc ml-4 mt-1 space-y-1 text-gray-800">
                      {exp.description.split("\n").map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {data.projects?.length > 0 && (
          <section>
            <h2 className="font-semibold text-[15px] mb-2" style={{ color: accentColor }}>
              Projects
            </h2>

            <div className="space-y-5">
              {data.projects.map((p, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{p.name}</h3>
                    {p.source && (
                      <a
                        href={p.source}
                        className="text-blue-600 text-[12px] underline"
                        target="_blank"
                      >
                        Source Code
                      </a>
                    )}
                  </div>

                  {p.description && (
                    <ul className="list-disc ml-4 mt-1 text-gray-800 space-y-1">
                      {p.description.split("\n").map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LANGUAGES */}
        {data.languages?.length > 0 && (
          <section>
            <h2 className="font-semibold text-[15px] mb-2" style={{ color: accentColor }}>
              Languages
            </h2>
            <p>{data.languages.join(", ")}</p>
          </section>
        )}

        {/* LEADERSHIP */}
        {data.leadership?.length > 0 && (
          <section>
            <h2 className="font-semibold text-[15px] mb-2" style={{ color: accentColor }}>
              Leadership & Extracurricular Activities
            </h2>
            <ul className="list-disc ml-4 space-y-1">
              {data.leadership.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;