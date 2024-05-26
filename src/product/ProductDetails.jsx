import React, { useState, useRef } from 'react';
import ProductImg from '../assets/images/download (1).png';

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [productOptions, setProductOptions] = useState([]);
  const [checkedStates, setCheckedStates] = useState([]);
  const optionsImageInputRef = useRef(null);
  const [category, setCategory] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);

  const handleOptionsImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newProductOptions = [];
    const newCheckedStates = [];

    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newProductOptions.push({ src: e.target.result, name: file.name });
        newCheckedStates.push(index === files.length - 1); 

        if (newProductOptions.length === files.length) {
          setProductOptions([...productOptions, ...newProductOptions]);
          setCheckedStates([...checkedStates, ...newCheckedStates]);

          if (!selectedImage) {
            setSelectedImage(newProductOptions[newProductOptions.length - 1].src);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePlaceholderImageClick = () => {
    optionsImageInputRef.current.click();
  };

  const handleCheckboxClick = (index) => {
    const updatedCheckedStates = checkedStates.map((state, i) => i === index);
    setSelectedImage(productOptions[index].src);
    setCheckedStates(updatedCheckedStates);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleTagDelete = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const handleOptionRemove = (index) => {
    const updatedOptions = productOptions.filter((_, i) => i !== index);
    const updatedCheckedStates = checkedStates.filter((_, i) => i !== index);

    if (productOptions[index].src === selectedImage) {
      const newSelectedIndex = updatedOptions.length > 0 ? 0 : null;
      setSelectedImage(newSelectedIndex !== null ? updatedOptions[newSelectedIndex].src : null);
      const newCheckedStates = updatedOptions.map((_, i) => i === newSelectedIndex);
      setCheckedStates(newCheckedStates);
    } else {
      setCheckedStates(updatedCheckedStates);
    }

    setProductOptions(updatedOptions);
  };

  return (
    <>
      <style>
        {`
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        `}
      </style>

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

          <div className="mb-4 input-container">
            <h3 className="text-sm">Description</h3>
            <div className="input-wrapper relative">
              <input
                id="descriptionInput"
                className="w-full h-36 pl-2 pt-10 mt-2 border rounded-md border-gray-500"
                type="text"
                placeholder="Type description here"
                style={{paddingBottom:"10rem"}}
              />
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm">Category</h3>
            <select
              className="w-full h-12 rounded-md pl-2 mt-2 border border-gray-500 custom-select"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="" disabled>Select category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home-appliances">Home Appliances</option>
              <option value="books">Books</option>
              <option value="toys">Toys</option>
            </select>
          </div>

          <div className="mb-4">
            <h3 className="text-sm">Brand Name</h3>
            <input className="w-full h-12 rounded-md pl-2 mt-2 border border-gray-500" type="text" placeholder="Type brand name here" />
          </div>

          <div className="flex justify-between">
            <div className="w-1/2 mr-2">
              <h4 className="text-sm mt-5">SKU</h4>
              <input className="w-full h-12 rounded-md pl-2 mt-2 border border-gray-500" type="number" inputMode="numeric" placeholder="Enter SKU here" />
            </div>
            <div className="w-1/2 ml-2">
              <h4 className="text-sm mt-5">Stock Quantity</h4>
              <input className="w-full h-12 rounded-md pl-2 mt-2 border border-gray-500" type="number" inputMode="numeric" placeholder="1258" />
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <div className="w-1/2 mr-2">
              <h4 className="text-sm mt-5">Regular Price</h4>
              <input className="w-full h-12 rounded-md pl-2 mt-2 border border-gray-500" type="number" inputMode="numeric" placeholder="$1000" />
            </div>
            <div className="w-1/2 ml-2">
              <h4 className="text-sm mt-5">Sale Price</h4>
              <input className="w-full h-12 rounded-md pl-2 mt-2 border border-gray-500" type="number" inputMode="numeric" placeholder="$450" />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm">Tag</h3>
            <div className="w-full border border-black rounded-lg p-2 mt-2 flex items-center flex-wrap">
              {tags.map((tag, index) => (
                <div key={index} className="bg-black text-gray-200 rounded-full px-4 py-2 mr-2 mb-2 flex items-center">
                  <span className="mr-1">{tag}</span>
                  <button onClick={() => handleTagDelete(index)} className="text-white font-bold">&times;</button>
                </div>
              ))}
              <input
                className="border border-black rounded-full px-4 py-2 flex-grow"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}
                placeholder="Type a tag"
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 lg:ml-5 mt-5 lg:mt-0">
          {selectedImage ? (
            <img
              className="w-full rounded-lg"
              src={selectedImage}
              alt="Product"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
              <span className="text-gray-500">No image selected</span>
            </div>
          )}
          
          <h3 className="mt-4">Product Gallery</h3>
          <input
            type="file"
            ref={optionsImageInputRef}
            onChange={handleOptionsImageChange}
            className="hidden"
            multiple
            accept="image/jpeg,image/png,image/gif"
          />
          <div className="border border-dashed border-black rounded-lg p-4 mt-5 text-center" onClick={handlePlaceholderImageClick}>
            <img src={ProductImg} alt="" className="w-1/4 inline-block cursor-pointer" />
            <p className="text-sm mt-2">Drop Your Image here, or browse (jpeg, png, gif) files are allowed</p>
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
                      <button
                        className="ml-2 text-red-500 font-bold"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOptionRemove(index);
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center items-center mt-5">
            <input className="bg-blue-700 text-white w-24 h-10 mx-2 rounded-md" type="submit" value="DELETE" />
            <input className="bg-gray-300 text-black w-24 h-10 mx-2 rounded-md" type="submit" value="CANCEL" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;