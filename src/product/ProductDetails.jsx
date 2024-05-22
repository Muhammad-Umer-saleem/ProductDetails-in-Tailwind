import React, { useState, useRef } from 'react';
import MainImg from '../assets/images/photo-1543076447-215ad9ba6923.avif';
import ProductImg from '../assets/images/download (1).png';

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(MainImg);
  const [productOptions, setProductOptions] = useState([]);
  const [checkedStates, setCheckedStates] = useState([]);
  const mainImageInputRef = useRef(null);
  const optionsImageInputRef = useRef(null);

  const handleMainImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOptionsImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = e.target.result;
        setProductOptions([...productOptions, { src: newImage, name: file.name }]);
        setCheckedStates([...checkedStates, false]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlaceholderImageClick = () => {
    optionsImageInputRef.current.click();
  };

  const handleCheckboxClick = (index) => {
    const updatedCheckedStates = [...checkedStates];
    updatedCheckedStates[index] = !updatedCheckedStates[index];
    setCheckedStates(updatedCheckedStates);
  };

  return (
    <>
      <div className="bg-gray-200 h-16 flex flex-col items-start justify-center px-4 sm:px-8">
        <h3 className="text-lg font-bold">Product Details</h3>
        <p className="hidden sm:block">Home &gt; All Products &gt; Add New Products</p>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start bg-white m-1 p-5 rounded-lg shadow-lg">
        <div className="w-full lg:w-2/3">
          <div className="mb-4">
            <h3 className="text-sm">Product Name</h3>
            <input className="w-full h-12 rounded-md pl-2 mt-2 border border-gray-500" type="text" placeholder="Type name here" />
          </div>

          <div className="mb-4">
            <h3 className="text-sm">Description</h3>
            <input className="w-full h-36 pl-2 pt-2 mt-2 border rounded-md border-gray-500" type="text" placeholder="Type description here" />
          </div>

          <div className="mb-4">
            <h3 className="text-sm">Category</h3>
            <input className="w-full h-12 rounded-md pl-2 mt-2 border border-gray-500" type="text" placeholder="Type category here" />
          </div>

          <div className="mb-4">
            <h3 className="text-sm">Brand Name</h3>
            <input className="w-full h-12 rounded-md pl-2 mt-2 border border-gray-500" type="text" placeholder="Type brand name here" />
          </div>

          <div className="flex justify-between">
            <div className="w-1/2 mr-2">
              <h4 className="text-sm mt-5">SKU</h4>
              <input className="w-full h-12 rounded-md pl-2 mt-2 border border-gray-500" type="text" placeholder="Enter SKU here" />
            </div>
            <div className="w-1/2 ml-2">
              <h4 className="text-sm mt-5">Stock Quantity</h4>
              <input className="w-full h-12 rounded-md pl-2 mt-2 border border-gray-500" type="text" placeholder="1258" />
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <div className="w-1/2 mr-2">
              <h4 className="text-sm mt-5">Regular Price</h4>
              <input className="w-full h-12 rounded-md pl-2 mt-2 border border-gray-500" type="text" placeholder="$1000" />
            </div>
            <div className="w-1/2 ml-2">
              <h4 className="text-sm mt-5">Sale Price</h4>
              <input className="w-full h-12 rounded-md pl-2 mt-2 border border-gray-500" type="text" placeholder="$450" />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm">Tag</h3>
            <div className="w-full border border-black rounded-lg p-5 mt-2 flex">
              <button className="bg-black text-gray-200 rounded-full px-4 py-2 mr-2">Lorem</button>
              <button className="bg-black text-gray-200 rounded-full px-4 py-2 mr-2">Lorem</button>
              <button className="bg-black text-gray-200 rounded-full px-4 py-2">Lorem</button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 lg:ml-5 mt-5 lg:mt-0">
          <img
            className="w-full rounded-lg cursor-pointer"
            src={selectedImage}
            alt="Product"
            onClick={() => mainImageInputRef.current.click()}
          />
          <input
            type="file"
            ref={mainImageInputRef}
            onChange={handleMainImageChange}
            className="hidden"
          />
          <h3 className="mt-4">Product Gallery</h3>
          <input
            type="file"
            ref={optionsImageInputRef}
            onChange={handleOptionsImageChange}
            className="hidden"
          />
          <div className="border border-dashed border-black rounded-lg p-4 mt-5 text-center" onClick={handlePlaceholderImageClick}>
            <img src={ProductImg} alt="" className="w-1/4 inline-block cursor-pointer" />
            <p className="text-sm mt-2">Drop Your Image here, or browse jpeg.png are allowed</p>
          </div>

          {productOptions.map((option, index) => (
            <div className="mt-5" key={index}>
              <div className="flex flex-col bg-gray-200 p-2 rounded-md">
                <div className="flex items-center cursor-pointer">
                  <img src={option.src} alt={`Option ${index + 1}`} className="w-1/5 mr-4" />
                  <div className="flex flex-col flex-grow">
                    <span className="text-sm overflow-hidden text-ellipsis mb-2">{option.name}</span>
                    <div className="flex justify-between items-center w-full">
                      <div className="progress-container w-4/5">
                        <div className="progress-bar bg-blue-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                      <div
                        className="rounded-full ml-2 border border-gray-500 cursor-pointer flex items-center justify-center"
                        style={{
                          width: '20px',
                          height: '20px',
                          backgroundColor: checkedStates[index] ? 'blue' : '#fff',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCheckboxClick(index);
                        }}
                      >
                        {checkedStates[index] && (
                          <div
                            style={{
                              width: '12px',
                              height: '12px',
                              color: 'white',
                              fontWeight: 'bold',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            ✓
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center items-center mt-5">
            <button className="bg-blue-700 text-white w-24 h-10 mx-2 rounded-md">DELETE</button>
            <button className="bg-gray-300 text-black w-24 h-10 mx-2 rounded-md">CANCEL</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;