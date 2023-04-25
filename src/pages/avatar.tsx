import React, { useState } from 'react';
import Image from 'next/image';

const ImageComponent = () => {
  const [selectedImage, setSelectedImage] = useState('/images/dog1.png');
  const [showModal, setShowModal] = useState(false);

  const imageList = ['/images/dog1.png', '/images/dog2.png', '/images/dog3.png', '/images/dog4.png', '/images/dog5.png'];

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
    setShowModal(false);
  };

  return (
    <div>
      <Image
        src={selectedImage}
        width={72}
        height={72}
        alt="Selected Image"
        onClick={handleImageClick}
        className="cursor-pointer hover:shadow-lg hover:scale-110 transition-all duration-300 ease-in-out rounded-xl"
      />

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-32 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Escolha uma foto para seu aumigo:</h3>

                <div className="mt-4 space-y-4 flex flex-row">
                  {imageList.map((image) => (
                    <div key={image} className="flex self-end">
                      <Image
                        src={image}
                        width={50}
                        height={50}
                        alt={`Image ${imageList.indexOf(image) + 1}`}
                        className="w-16 h-16 rounded-lg cursor-pointer hover:shadow-lg hover:scale-110 transition-all duration-300 ease-in-out"
                        onClick={() => handleImageSelect(image)}
                      />

                      <div className="ml-4">
                        {/* <p className="text-gray-700">{`Image ${imageList.indexOf(image) + 1}`}</p> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm hover:scale-110 transition-all duration-300 ease-in-out"
                  onClick={() => setShowModal(false)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
