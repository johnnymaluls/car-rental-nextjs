"use client";

import { CarDetailsProps } from "@/types";
import Image from "next/image";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { calculateCarRent, generateCarImageUrl } from "@/utils";

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car;

  const [imageSrc, setImageSrc] = useState(generateCarImageUrl(car));
  const [imageSrc1, setImageSrc1] = useState(generateCarImageUrl(car, "29"));
  const [imageSrc2, setImageSrc2] = useState(generateCarImageUrl(car, "33"));
  const [imageSrc3, setImageSrc3] = useState(generateCarImageUrl(car, "13"));

  const onErrorImage = (index: number) => {
    // Set the image src at the specified index to a default image if the src link returns an error
    const defaultImageSrc = "/default-image.jpg";
    const imageSources = [imageSrc, imageSrc1, imageSrc2, imageSrc3];
    const updatedSources = [...imageSources];
    updatedSources[index] = defaultImageSrc;

    // Update the state variables with the new image sources
    setImageSrc(updatedSources[0]);
    setImageSrc1(updatedSources[1]);
    setImageSrc2(updatedSources[2]);
    setImageSrc3(updatedSources[3]);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white flex flex-col gap-5 shadown-xl text-left p-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                  >
                    <Image
                      src="/close.svg"
                      alt="close-icon"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="relative w-full h-40 bg-primary-blue-100 rounded-lg">
                      <Image
                        src={imageSrc}
                        alt="car-model"
                        fill
                        priority
                        className="object-contain"
                        onError={() => onErrorImage(0)}
                      />
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <Image
                          src={imageSrc1}
                          alt="car-model"
                          fill
                          priority
                          className="object-contain"
                          onError={() => onErrorImage(1)}
                        />
                      </div>
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <Image
                          src={imageSrc2}
                          alt="car-model"
                          fill
                          priority
                          className="object-contain"
                          onError={() => onErrorImage(2)}
                        />
                      </div>
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <Image
                          src={imageSrc3}
                          alt="car-model"
                          fill
                          priority
                          className="object-contain"
                          onError={() => onErrorImage(3)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="font-semibold text-xl capitalize">
                      {make} {model}
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-4">
                      {Object.entries(car).map(([key, value]) => (
                        <div
                          className="flex justify-between gap-5 w-full"
                          key={key}
                        >
                          <h4 className="text-grey capitalize">
                            {key.split("_").join(" ")}
                          </h4>
                          <p className="text-black-100 font-semibold capitalize">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarDetails;
