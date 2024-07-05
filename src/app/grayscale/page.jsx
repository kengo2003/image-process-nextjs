"use client";
import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    const canvas1 = document.querySelector("#canvas1");
    const ctx1 = canvas1.getContext("2d");
    const canvas2 = document.querySelector("#canvas2");
    const ctx2 = canvas2.getContext("2d");
    const image = new Image();
    const file = document.querySelector("#file");

    file.onchange = () => {
      if (file.files.length > 0) {
        image.src = window.URL.createObjectURL(file.files[0]);
        image.onload = () => {
          canvas1.width = image.width;
          canvas1.height = image.height;
          canvas2.width = image.width;
          canvas2.height = image.height;
          ctx1.drawImage(image, 0, 0);
          window.URL.revokeObjectURL(image.src);
          render();
        };
      }
    };

    function render() {
      const imageData = ctx1.getImageData(0, 0, image.width, image.height);
      const pixel = imageData.data;

      for (let i = 0; i < pixel.length; i += 4) {
        const gray =
          0.299 * pixel[i] + 0.587 * pixel[i + 1] + 0.114 * pixel[i + 2];
        pixel[i] = gray;
        pixel[i + 1] = gray;
        pixel[i + 2] = gray;
      }
      imageData.data.set(pixel);
      ctx2.putImageData(imageData, 0, 0);
    }
  }, []);

  return (
    <div className="text-center">
      <h2 className="text-2xl pt-5">グレースケール化</h2>
      <form className="py-10">
        <input type="file" id="file" />
      </form>
      <p>処理前</p>
      <canvas id="canvas1"></canvas>
      <p>処理後</p>
      <canvas id="canvas2"></canvas>
    </div>
  );
};

export default Page;
