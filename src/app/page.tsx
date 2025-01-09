'use client'

import { useEffect, useState } from "react";


interface Size {
  name: string;
  dimensions: string;
}

interface Furniture {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  sizes: Size[];
  rating: number;
  image: string;
  stock_quantity: number;
}

const FurnitureList = () => {
  const [furniture, setFurniture] = useState<Furniture[]>([]);

  useEffect(() => {
    const fetchFurniture = async () => {
      const res = await fetch("https://677cebe74496848554c83415.mockapi.io/api/b1/Products");
      const data: Furniture[] = await res.json();
      setFurniture(data);
    };
    fetchFurniture();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Furniture List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {furniture.map((item) => (
          <div
            key={item.id}
            className="furniture-item bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-lg font-bold text-gray-800 mt-2">Price: ${item.price}</p>
              <p className="text-sm text-gray-500 mt-1">Rating: {item.rating} ⭐</p>
              <p className="text-sm text-gray-500">Stock Quantity: {item.stock_quantity}</p>
              <p className="mt-3 text-gray-700 font-semibold">Sizes:</p>
              <ul className="list-disc list-inside text-gray-600">
                {item.sizes.map((size, index) => (
                  <li key={index}>
                    {size.name} - {size.dimensions}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FurnitureList;
