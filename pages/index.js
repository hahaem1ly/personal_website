import { useRef } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";
import Image from "next/image";


// Local Data
import data from "../data/portfolio.json";
import timelineData from '../data/timelinedata.json'

export default function Home() {
  // Ref
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();

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
            />
          </div>
        </div>
        {/* timeline */}
        <div className="container mx-auto mt-20">
  <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Experience Timeline</h2>
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
            index % 2 === 0 ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gradient-to-r from-green-500 to-teal-500"
          }`}
        >
          <i className="fas fa-briefcase text-xl"></i>
        </div>

        {/* Timeline Content */}
        <div
          className={`bg-white shadow-lg rounded-lg p-6 w-5/12 ${
            index % 2 === 0 ? "ml-8 hover:scale-105 hover:-translate-y-2" : "mr-8 hover:scale-105 hover:-translate-y-2"
          }`}
        >
          <h3 className="text-2xl font-semibold text-gray-800">{item.title}</h3>
          <p className="text-sm text-gray-500 italic mb-4">{item.date}</p>

          {/* Handle Nested Roles */}
          {item.roles ? (
            <ul className="mt-4 space-y-4">
              {item.roles.map((role, roleIndex) => (
                <li key={roleIndex} className="space-y-2">
                  <strong className="block text-gray-800 text-lg">{role.title}</strong>
                  <p className="text-gray-600">{role.description}</p>
                  <p className="text-gray-500 italic text-sm">{role.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <>
              {/* Display Role Name */}
              {item.role && (
                <strong className="block text-gray-800 text-lg">{item.role}</strong>
              )}
              {/* Description */}
              <p className="text-gray-700">{item.description}</p>
            </>
          )}

          <span className="block text-gray-400 text-sm mt-4">{item.location}</span>
        </div>
      </div>
    ))}
  </div>
</div>












       


        {/* Socials Section */}
        <Socials className="mt-2 laptop:mt-5" />

        {/* Work Section */}
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
          <h1 className="text-2xl text-bold">Work.</h1>
          <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
            {data.projects.map((project) => (
              <WorkCard
                key={project.id}
                img={project.imageSrc}
                name={project.title}
                description={project.description}
                onClick={() => window.open(project.url)}
              />
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h1 className="tablet:m-10 text-2xl text-bold">Services.</h1>
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>

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
