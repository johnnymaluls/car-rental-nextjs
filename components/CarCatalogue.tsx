"use client";

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fetchCars, isArrayEmpty } from "@/utils";
import { useState, useEffect } from "react";
import { fuels, yearsOfProduction } from "@/constants";
import Image from "next/image";

const CarCatalogue = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDataEmpty, setIsDataEmpty] = useState(true);
  const [allCars, setAllCars] = useState([]);
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("2022");
  const [fuel, setFuel] = useState("");
  const [limit, setLimit] = useState("12");
  const pageNumber = "";

  useEffect(() => {
    SearchCar();
  }, [manufacturer, model, year, fuel, limit]);

  const SearchCar = async () => {
    setIsLoading(true);
    try {
      // params or default value
      const response = await fetchCars({
        manufacturer: manufacturer || "",
        year: year,
        fuel: fuel,
        limit: limit,
        model: model,
      });
      console.log(response);
      const isEmpty = isArrayEmpty(response);
      setIsDataEmpty(isEmpty);
      setAllCars(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter
              title="year"
              options={yearsOfProduction}
              setFilter={setYear}
            />
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
                  pageNumber={parseInt(pageNumber) / 12}
                  isNext={parseInt(limit) > allCars.length}
                  setLimit={setLimit}
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
          <div className="mt-16 w-full flex-center">
            <Image
              src="/loader.svg"
              alt="loading-image"
              width={50}
              height={50}
            />
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
