import React from "react";
import { ChevronLeft,  Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";


const Search = ({ meals, loading }) => {
  return (
    <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to={"/"}
        className="text-yellow-400 hover:text-yellow-300 flex items-center mb-6 font-medium transition text-lg group"
      >
        <ChevronLeft className="w-6 h-6 mr-1 transition" />
        Back to Dashboard
      </Link>

      {loading && (
        <div className="text-center p-8 text-gray-300">
          <Loader2 className="animate-spin inline-block mr-2 text-blue-400" />
          Searching the database...
        </div>
      )}

      {!loading && meals.length > 0 && (
        <div className="grid grid-clos-1 sm:grid-clos-3 lg:grid-cols-4 gap-12" >
          {
            meals.map((meal, index) => (
              <RecipeCard key={index} meal={meal} />
            ))
          }
        </div>
      )}
    </main>
  );
};

export default Search;