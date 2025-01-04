import React from "react";

const Modal = ({ show, onClose, project }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl p-8 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >
          ✕
        </button>

        {/* Modal Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{project.title}</h2>

        {/* Modal Image */}
        <div className="mb-8">
          <img
            src={project.imageSrc}
            alt={project.title}
            className="rounded-lg w-full object-cover h-64"
          />
        </div>

        {/* Modal Body */}
        <p className="text-gray-700 text-lg mb-8 leading-relaxed">
          {project.description}
        </p>

        {/* Link/Button */}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            View Project
          </a>
        )}
      </div>
    </div>
  );
};

export default Modal;

