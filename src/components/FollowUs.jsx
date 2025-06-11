import React from "react";
import image from "../assets/imgs/follow/image.png";
import image1 from "../assets/imgs/follow/image1.png";
import image2 from "../assets/imgs/follow/image2.png";
import image3 from "../assets/imgs/follow/image3.png";
import image4 from "../assets/imgs/follow/image4.png";
import image5 from "../assets/imgs/follow/image5.png";
import image6 from "../assets/imgs/follow/image6.png";
const FollowUs = () => {
  const images = [image, image1, image2, image3, image4, image5, image6];
  return (
    <>
      <div className="bg-gray-100 py-36">
        <div className="text-center mb-20">
          <h3 className="text-3xl font-bold text-gray-800 mb-2">
            Follow Us On Instagram
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
            duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
            sollicitudin{" "}
          </p>
        </div>
        <div className="flex justify-center items-center ">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`fashion-${index}`}
              className="w-52 h-auto rounded-sm shadow-md object-cover"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FollowUs;
