import React from "react";
import { useParams, Link } from "react-router-dom";
import {resourcesData} from '../components/data'

const ResourceDetails = () => {
  const { id } = useParams();
  const resource = resourcesData.find((item) => item.id === Number(id));

  if (!resource) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Resource not found</h2>
        <Link to="/resources" className="text-blue-600 font-semibold underline">
          Back to Resources
        </Link>
      </div>
    );
  }

  return (
    <div className="font-[Inter]">
      {/* Banner */}
      <section className="relative bg-[#041d29] text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="uppercase bg-[#E6F4FF] text-[#0073E6] text-xs font-medium px-3 py-1 rounded-full mb-3 inline-block">
            {resource.type}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            {resource.title}
          </h1>
        </div>
      </section>

      {/* Image */}
      <div className="max-w-5xl mx-auto my-10 px-4">
        <img
          src={resource.image}
          alt={resource.title}
          className="w-full rounded-2xl shadow-md object-cover"
        />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <p className="text-lg text-slate-700 leading-relaxed mb-8">
          {resource.description}
        </p>
        <p className="text-slate-600 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          facilisi. Sed ut sapien nec justo finibus ullamcorper. Fusce vel
          posuere magna, nec faucibus eros. In feugiat nulla sed neque
          facilisis, at mattis lorem ultrices. Aenean lacinia mi vel mattis
          suscipit. Curabitur id posuere elit.
        </p>
        <div className="mt-10">
          <Link
            to="/resources"
            className="inline-block bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-800 transition"
          >
            ← Back to Resources
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetails;
