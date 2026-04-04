import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CallToAction = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <div
      id="cta"
      className="
        w-full max-w-5xl mx-auto px-5 sm:px-10 
        mt-12 sm:mt-16 
        border-y border-dashed border-slate-200
      "
    >
      <div
        className="
          flex flex-col md:flex-row items-center justify-between 
          text-center md:text-left
          gap-6 sm:gap-8
          px-4 sm:px-8 md:px-10
          py-10 md:py-12
          border-x border-dashed border-slate-200
        "
      >
        <p className="text-lg sm:text-xl md:text-2xl font-medium max-w-md text-slate-800">
          Build a professional resume that helps you stand out and get hired
        </p>

        {!user?.id && (
          <Link
            to="/app?state=register"
            className="
              flex items-center gap-2 rounded-full
              py-2.5 px-7 
              bg-blue-600 hover:bg-blue-700 
              transition text-white font-medium
              shadow-md
            "
          >
            <span>Get Started</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CallToAction;