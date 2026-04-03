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
    <div className="w-full max-w-[850px] mx-auto bg-white text-gray-900 text-sm leading-relaxed grid grid-cols-[260px_1fr]">

      {/* LEFT SIDEBAR */}
      <aside
        className="min-h-full px-6 py-8 text-white"
        style={{ backgroundColor: accentColor }}
      >
        {/* PROFILE IMAGE */}
        {data.personal_info?.image && (
          <div className="flex justify-center mb-6">
            <img
              src={
                typeof data.personal_info.image === "string"
                  ? data.personal_info.image
                  : URL.createObjectURL(data.personal_info.image)
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 shadow-lg"
              style={{ borderColor: "white" }}
            />
          </div>
        )}

        {/* NAME */}
        <h1 className="text-2xl font-semibold leading-tight text-center">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        {/* PROFESSION */}
        {data.personal_info?.profession && (
          <p className="text-sm opacity-90 mt-1 text-center">
            {data.personal_info.profession}
          </p>
        )}

        {/* CONTACT */}
        <div className="mt-6 space-y-3 text-sm opacity-95">
          {data.personal_info?.email && (
            <p className="flex items-center gap-2">
              <Mail className="size-4" />
              <span>{data.personal_info.email}</span>
            </p>
          )}
          {data.personal_info?.phone && (
            <p className="flex items-center gap-2">
              <Phone className="size-4" />
              {data.personal_info.phone}
            </p>
          )}
          {data.personal_info?.location && (
            <p className="flex items-center gap-2">
              <MapPin className="size-4" />
              {data.personal_info.location}
            </p>
          )}
          {data.personal_info?.linkedin && (
            <p className="flex items-center gap-2 break-all">
              <Linkedin className="size-4" />
              {data.personal_info.linkedin.replace(/^https?:\/\//, "")}
            </p>
          )}
          {data.personal_info?.website && (
            <p className="flex items-center gap-2 break-all">
              <Globe className="size-4" />
              {data.personal_info.website.replace(/^https?:\/\//, "")}
            </p>
          )}
        </div>

        {/* SKILLS */}
        {data.skills?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold border-b border-white/40 pb-1">
              Skills
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <li
                  key={index}
                  className="bg-white text-gray-800 px-2 py-1 rounded text-xs"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* LANGUAGES */}
        {data.languages?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold border-b border-white/40 pb-1">
              Languages
            </h2>
            <ul className="mt-3 space-y-1">
              {data.languages.map((lang, index) => (
                <li key={index}>{lang}</li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* RIGHT MAIN SECTION */}
      <main className="px-8 py-8 space-y-8">
        {/* SUMMARY */}
        {data.professional_summary && (
          <section>
            <h2
              className="text-lg font-bold uppercase tracking-wide border-b pb-1"
              style={{ borderColor: accentColor }}
            >
              Professional Summary
            </h2>
            <p className="mt-2 text-gray-800">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* EDUCATION */}
        {data.education?.length > 0 && (
          <section>
            <h2
              className="text-lg font-bold uppercase tracking-wide border-b pb-1"
              style={{ borderColor: accentColor }}
            >
              Education
            </h2>
            <div className="mt-3 space-y-4">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-semibold">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  <div className="text-xs text-gray-600 mt-1">
                    {formatDate(edu.graduation_date)}
                  </div>
                  {edu.gpa && (
                    <p className="text-xs mt-1">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EXPERIENCE */}
        {data.experience?.length > 0 && (
          <section>
            <h2
              className="text-lg font-bold uppercase tracking-wide border-b pb-1"
              style={{ borderColor: accentColor }}
            >
              Internships & Experience
            </h2>
            <div className="mt-3 space-y-5">
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{exp.position}</h3>
                      <p className="text-gray-700">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-600">
                      {formatDate(exp.start_date)} –{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="mt-2 text-gray-800 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {data.projects?.length > 0 && (
          <section>
            <h2
              className="text-lg font-bold uppercase tracking-wide border-b pb-1"
              style={{ borderColor: accentColor }}
            >
              Projects
            </h2>
            <div className="mt-3 space-y-4">
              {data.projects.map((p, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{p.name}</h3>
                  {p.description && (
                    <p className="text-gray-800 mt-1">{p.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LEADERSHIP */}
        {data.leadership?.length > 0 && (
          <section>
            <h2
              className="text-lg font-bold uppercase tracking-wide border-b pb-1"
              style={{ borderColor: accentColor }}
            >
              Leadership & Activities
            </h2>
            <ul className="mt-3 space-y-2">
              {data.leadership.map((item, index) => (
                <li key={index} className="text-gray-800">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};

export default ModernTemplate;
