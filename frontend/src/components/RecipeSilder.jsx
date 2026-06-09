import React from "react";
import { useFetch } from "./useFetch";
import RecipeCard from "./RecipeCard";
import SliderModule from "react-slick";
import { Clock, Loader2 } from "lucide-react";

const Slider = SliderModule.default;

const RecipeSilder = ({ title, fetchUrl }) => {
  const { data, loading, error } = useFetch(fetchUrl);

  const meals = data?.meals || [];

  const settings = {
    dots: true,
    infinite: meals.length > 3,
    speed: 600,
    slidesToShow: 3,
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

      <div className="w-[90%] mx-auto">
        <Slider {...settings}>
          {meals.map((meal) => (
            <div key={meal.idMeal} className="px-4">
              <RecipeCard meal={meal} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default RecipeSilder;