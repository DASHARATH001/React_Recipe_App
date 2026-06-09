import React from "react";
import { useFetch } from "./useFetch";
import RecipeCard from "./RecipeCard";
import SliderModule from "react-slick";
import { Link } from 'react-router-dom'
import { Clock, Loader2 } from "lucide-react";

const Slider = SliderModule.default;

const TreadingSilder = ({ title, fetchUrl }) => {
  const { data, loading, error } = useFetch(fetchUrl);

  const meals = data?.meals || [];

  const settings = {
    dots: true,
    arrows: false,
    infinite: meals.length > 3,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className="text-center p-8 text-gray-300">
        <Loader2 className="animate-spin inline-block text-blue-400 mr-2" />
        Loading {title}...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <section className="mt-6 mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-100 tracking-tight border-l-4 border-yellow-400 pl-4 flex items-center mb-6">
        <Clock className="w-6 h-6 mr-3 text-blue-500" />
        {title}
      </h2>

      <div className="w-full mx-auto">
        <Slider {...settings}>
          {meals.map((meal) => (
            <div key={meal.idMeal} className="px-4">
              <Link to={`/recipe/${meal.idMeal}/`} >
                <div className='relative bg-gray-900 rounded-xl shadow-xl shadow-black/50 overflow-hidden group
    transform transition duration-500 cursor-pointer border=gray-800 hover:shadow-blue-600/50 mb-5 ' >
                  {/*hover glow */}
                  <div className='absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/80  transition duration-500' >
                  </div>

                  <div className='flex justify-center items-center p-5' >
                    <img src={meal?.strMealThumb} className='h-[120px] w-[120px] rounded-xl border-yellow-400 transition duration-500 group-hover:scale-105' />
                  </div>
                  <div className='p-2 text-center'>
                    <h3 className='text-xl font-bold text-gray-100 mb-1  group-hover:text-blue-400 
        transition duration-300 ' >{meal.strMeal}</h3>

                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TreadingSilder;