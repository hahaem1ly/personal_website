import { useEffect, useRef, useState} from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger, animateProfileImage } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";
import Image from "next/image";

// Local Data
import data from "../data/portfolio.json";
import timelineData from "../data/timelinedata.json";
import educationData from "../data/education.json";
import Modal from "./modal";


export default function Home() {
  // Refs
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();
  const profileImageRef = useRef(); // Ref for profile image


   // Modal State
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedProject, setSelectedProject] = useState(null);
 
   // Modal Handlers
   const openModal = (project) => {
     setSelectedProject(project);
     setIsModalOpen(true);
   };
 
   const closeModal = () => {
     setIsModalOpen(false);
     setSelectedProject(null);
   };
 

  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  useEffect(() => {
    if (profileImageRef.current) {
      profileImageRef.current.style.animation = "rollIn 2s ease-out";
    }
  }, []);

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />
        {/* Main Section: Flexbox for Text and Profile Picture */}
        <div className="laptop:mt-20 mt-10 flex items-center">
          {/* Left Section: Text */}
          <div className="w-2/3">
            <h1
              ref={textOne}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineOne}
            </h1>

            <h1
              ref={textTwo}
              className="text-2xl tablet:text-5xl laptop:text-5xl laptopl:text-7xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineTwo}
            </h1>

            <h1
              ref={textThree}
              className="text-2xl tablet:text-5xl laptop:text-5xl laptopl:text-7xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineThree}
            </h1>
            <h1
              ref={textFour}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineFour}
            </h1>
          </div>

          {/* Right Section: Profile Picture */}
          <div className="w-1/3 flex justify-center">
            <Image
              src="/images/profile.png"
              alt="My Profile Picture"
              width={600}
              height={600}
              className="rounded-full shadow-lg"
              ref={profileImageRef} // Attach ref to image
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="container mx-auto mt-20">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Experience Timeline
          </h2>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-gray-300"></div>

            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`mb-16 flex items-center w-full ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Timeline Icon */}
                <div
                  className={`z-10 flex items-center justify-center w-12 h-12 rounded-full shadow-lg text-white ${
                    index % 2 === 0
                      ? "bg-gradient-to-r from-blue-500 to-purple-500"
                      : "bg-gradient-to-r from-green-500 to-teal-500"
                  }`}
                >
                  <i className="fas fa-briefcase text-xl"></i>
                </div>

                {/* Timeline Content */}
                <div
                  className={`bg-white shadow-lg rounded-lg p-6 w-5/12 ${
                    index % 2 === 0
                      ? "ml-8 hover:scale-105 hover:-translate-y-2"
                      : "mr-8 hover:scale-105 hover:-translate-y-2"
                  }`}
                >
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 italic mb-4">
                    {item.date}
                  </p>

                  {/* Handle Nested Roles */}
                  {item.roles ? (
                    <ul className="mt-4 space-y-4">
                      {item.roles.map((role, roleIndex) => (
                        <li key={roleIndex} className="space-y-2">
                          <strong className="block text-gray-800 text-lg">
                            {role.title}
                          </strong>
                          <p className="text-gray-600">{role.description}</p>
                          <p className="text-gray-500 italic text-sm">
                            {role.date}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <>
                      {/* Display Role Name */}
                      {item.role && (
                        <strong className="block text-gray-800 text-lg">
                          {item.role}
                        </strong>
                      )}
                      {/* Description */}
                      <p className="text-gray-700">{item.description}</p>
                    </>
                  )}

                  <span className="block text-gray-400 text-sm mt-4">
                    {item.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="container mx-auto mt-20">
          <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">
            Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transform transition duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12">
                    <Image
                      src="/images/luicon.png"
                      alt="Lund University Icon"
                      width={48}
                      height={48}
                      className="rounded-full shadow-md"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-gray-500 italic">
                      {edu.duration}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-600">
                  {edu.school}
                </p>
                <p className="text-gray-700 mt-4 leading-relaxed">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </div>


        {/* Socials Section */}
        <Socials className="mt-2 laptop:mt-5" />

       {/* Work Section */}
       <div className="container mx-auto mt-20 px-6 lg:px-0">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Recent Projects
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transform transition-transform hover:scale-105 flex items-start p-4 cursor-pointer"
                onClick={() => openModal(project)}
              >
                <div className="w-1/4">
                  <img
                    src={project.imageSrc}
                    alt={project.title}
                    className="rounded-md object-cover w-full h-full aspect-[4/3]"
                  />
                </div>
                <div className="w-3/4 pl-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <Modal
            show={isModalOpen}
            onClose={closeModal}
            project={selectedProject}
          />
        )}

        {/* Services Section */}
       

        {/* Development-only Edit Button */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-5 right-5">
            <Link href="/edit">
              <Button type="primary">Edit Data</Button>
            </Link>
          </div>
        )}

        {/* About Section */}
        <div className="mt-10 laptop:mt-40 p-2 laptop:p-0" ref={aboutRef}>
          <h1 className="tablet:m-10 text-2xl text-bold">About.</h1>
          <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
            {data.aboutpara}
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
