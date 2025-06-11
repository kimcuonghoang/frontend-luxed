import React, { useState } from "react";

const sizes = ["S", "M", "L", "XL"];
const colors = [
  { name: "Red", hex: "#f87171" },
  { name: "Green", hex: "#34d399" },
  { name: "Blue", hex: "#60a5fa" },
];
const brands = ["Nike", "Adidas", "Puma", "Uniqlo"];
const collections = ["Summer", "Winter", "Limited"];
const prices = ["100$-2000$", "2000$-4000$", "4000$-10000$"];
const tags = [
  "Fashion",
  "Style",
  "Sandal",
  "Hot",
  "Denim",
  "Jacket",
  "Bags",
  "Snaker",
];
export default function FiltersProduct() {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [selectedPrices, setSelectedPrices] = useState([]);

  const toggleItem = (item, list, setList) => {
    setList(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
    );
  };

  return (
    <div className="p-4 space-y-6  rounded-lg shadow-sm w-full bg-white">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Filters</h2>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Size</h3>
        <div className="flex gap-2 flex-wrap">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleItem(size, selectedSizes, setSelectedSizes)}
              className={`px-3 py-1 border rounded-full transition ${
                selectedSizes.includes(size)
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Color</h3>
        <div className="flex gap-3">
          {colors.map((color) => (
            <div
              key={color.name}
              title={color.name}
              className={`w-7 h-7 rounded-full border cursor-pointer transition ${
                selectedColors.includes(color.name) ? "ring-2 ring-black" : ""
              }`}
              style={{ backgroundColor: color.hex }}
              onClick={() =>
                toggleItem(color.name, selectedColors, setSelectedColors)
              }
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Price</h3>
        <div className="space-y-2">
          {prices.map((price) => (
            <label
              key={price}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedPrices.includes(price)}
                onChange={() =>
                  toggleItem(price, selectedPrices, setSelectedPrices)
                }
                className="accent-black"
              />
              <span>{price}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Brand</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() =>
                  toggleItem(brand, selectedBrands, setSelectedBrands)
                }
                className="accent-black"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Collection</h3>
        <select
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(e.target.value)}
          className="w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">All</option>
          {collections.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleItem(tag, selectedBrands, setSelectedBrands)}
              className={`px-3 py-1 border rounded-full text-sm transition ${
                selectedBrands.includes(tag)
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
