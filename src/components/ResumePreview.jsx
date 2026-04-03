import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center px-2 sm:px-4 md:px-8 py-4">
      <div
        id="resume-preview"
        className={`
          w-full 
          max-w-[850px] 
          bg-white 
          border border-gray-300 
          shadow-lg 
          print:shadow-none 
          print:border-none
          ${classes}
        `}
      >
        {renderTemplate()}
      </div>

      {/* PRINT & RESPONSIVE STYLES */}
      <style>
        {`
          @page {
            size: letter;
            margin: 0;
          }

          @media print {
            html, body {
              width: 8.5in;
              height: 11in;
              margin: 0;
              padding: 0;
              overflow: hidden;
            }

            body * {
              visibility: hidden;
            }

            #resume-preview,
            #resume-preview * {
              visibility: visible;
            }

            #resume-preview {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              margin: 0;
              padding: 0;
              box-shadow: none !important;
              border: none !important;
            }
          }

          /* Mobile scaling fix */
          @media (max-width: 640px) {
            #resume-preview {
              transform: scale(0.95);
              transform-origin: top center;
            }
          }
        `}
      </style>

    </div>
  )
}

export default ResumePreview
