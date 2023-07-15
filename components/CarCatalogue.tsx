"use client";

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fetchCars, isArrayEmpty } from "@/utils";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fuels, yearsOfProduction } from "@/constants";

const CarCatalogue = () => {
  //Get the Parameters
  const searchParams = useSearchParams();
  const manufacturer = searchParams.get("manufacturer");
  const year = searchParams.get("year");
  const fuel = searchParams.get("fuel");
  const limit = searchParams.get("limit");
  const model = searchParams.get("model");
  const pageNumber = searchParams.get("pageNumber");

  const [isLoading, setIsLoading] = useState(false);
  const [isDataEmpty, setIsDataEmpty] = useState(true);
  const [allCars, setAllCars] = useState([]);

  useEffect(() => {
    console.log("gumana useeffect");
    SearchCar();
  }, [searchParams]);

  const SearchCar = async () => {
    setIsLoading(true);
    // params or default value
    const response = await fetchCars({
      manufacturer: manufacturer || "",
      year: year || "2022",
      fuel: fuel || "",
      limit: limit || "12",
      model: model || "",
    });

    const isEmpty = isArrayEmpty(response);
    setIsDataEmpty(isEmpty);
    setAllCars(response);
    setIsLoading(false);
  };

  const generateUniqueKey = (prefix: string) => {
    const timestamp = Date.now().toString();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    return `${prefix}-${timestamp}-${randomSuffix}`;
  };

  return (
    <div className="mt-12 padding-x padding-y max-width" id="discover">
      <div className="home__text-container">
        <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
        <p>Explore the cars you might like</p>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        {!isLoading ? (
          <div>
            {!isDataEmpty ? (
              <section className="w-full">
                <div className="home__cars-wrapper">
                  {allCars?.map((car: any) => (
                    <CarCard car={car} key={generateUniqueKey("test")} />
                  ))}
                </div>
                <ShowMore
                  pageNumber={(parseInt(pageNumber!) || 12) / 12}
                  isNext={(parseInt(limit!) || 12) > allCars.length}
                />
              </section>
            ) : (
              <div className="home__error-container">
                <h2 className="text-black text-xl font-bold">
                  Oops, no results
                </h2>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-black text-xl font-bold">
              Loading cars.. please wait..
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCatalogue;
