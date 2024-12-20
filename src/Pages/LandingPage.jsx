import { Link } from "react-router-dom";
import LandingPageHero from "../assets/Saly-10.svg";
import HandoftheHero from "../assets/Saly-37.svg";
import PerformanceOfTheHero from "../assets/Saly-26.svg";

export default function LandingPage() {

  return (
    <div className="w-full md:h-screen  flex flex-col relative">

      <section className="flex-1 flex max-sm:flex-col  items-center justify-center text-center p-8">
        <div className="w-full md:w-1/2  ">
          <h2 className="text-4xl font-bold mb-4">
            Welcome to My KGNEWS<span className="text-red-500 px-2">Blog Panel</span>
          </h2>
          <p className="text-lg  mb-6">
            Insights, scoops, and stories from the world or{" "}
            <span className="text-gradient">
              Created by my Visitors & Users
            </span>
          </p>
          <Link
            className="bg-teal-600 hover:bg-teal-700 transition-all duration-300 ease-in-out text-white font-bold py-2 px-4 mt-4 rounded-full"
            to={"/dashboard"}
          >
            Get Started
          </Link>
        </div>

        <div className="block relative w-1/2 max-sm:w-full max-sm:justify-center max-sm:items-center">
          <img src={LandingPageHero} alt="LandingPageHero"  className="w-full h-full max-sm:h-96 object-cover"/>
          <div className="hidden lg:flex absolute top-0 left-0 animate-bounce ">
            <img src={PerformanceOfTheHero} alt="" />
          </div>
        </div>
      </section>

      <div className="hidden md:flex absolute w-96 h-96 bottom-0 left-0 -z-10">
        <img src={HandoftheHero} alt="" className="w-full h-full object-cover"  />
      </div>
    </div>
  );
}
