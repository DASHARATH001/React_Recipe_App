import React from 'react'
import { Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategorySelection = ({ filterByCategory }) => {
  const featuredCategories = [
    "Chicken",
    "Dessert",
    "Seafood",
    "Vegetarian",
    "Breakfast",
    "Pasta",
    "Goat",
    "Pork",
    "Lamb",
  ];
  return (
    <>
      <section className="mt-2 mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-100 mb-6 tracking-tight border-l-4 border-yellow-400 pl-4 flex items-center">
          <Utensils className="w-6 h-6 mr-3 text-blue-500" />
          Quick Filter by Primary Ingredient
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {featuredCategories.map((cat, index) => (
            <Link
              to={`/search/${cat}`}
              key={index}
              onClick={() => filterByCategory(cat)}
              className="
        flex items-center justify-center
        h-16 sm:h-20
        px-4
        rounded-2xl
        bg-gradient-to-r from-gray-800 to-gray-900
        border border-gray-700
        text-gray-100
        font-semibold text-sm sm:text-base
        shadow-lg shadow-black/40
        transition-all duration-300
        hover:scale-105
        hover:border-blue-500
        hover:text-blue-400
        hover:shadow-blue-500/20
        active:scale-95
      "
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export default CategorySelection