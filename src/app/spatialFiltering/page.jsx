"use client";
import React, { useEffect } from "react";

const page = () => {
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
        const menu = document.querySelector("#menu");
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

    menu.onchange = () => {
      if (image.src) render();
    };

    function render() {
      const imageData = ctx1.getImageData(0, 0, image.width, image.height);
      const pixel = imageData.data;

      const result = pixel.slice();
      const width = image.width;
      let j = new Uint32Array(9);
      let w = new Int8Array(9);

      for (let y = 1; y < image.height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const i = (x + y * width) * 4;
          j[0] = (x - 1 + (y - 1) * width) * 4;
          j[1] = (x + (y - 1) * width) * 4;
          j[2] = (x + 1 + (y - 1) * width) * 4;
          j[3] = (x - 1 + y * width) * 4;
          j[4] = i;
          j[5] = (x + 1 + y * width) * 4;
          j[6] = (x - 1 + (y + 1) * width) * 4;
          j[7] = (x + (y + 1) * width) * 4;
          j[8] = (x + 1 + (y + 1) * width) * 4;
          switch (menu.selectedIndex) {
            case 0:
              w = [1, 1, 1, 1, 1, 1, 1, 1, 1];
              result[i] = mad(0) / 9;
              result[i + 1] = mad(1) / 9;
              result[i + 2] = mad(2) / 9;
              break;
            case 1:
              w = [0, 1, 0, 1, -4, 1, 0, 1, 0];
              result[i] = Math.abs(mad(0));
              result[i + 1] = Math.abs(mad(1));
              result[i + 2] = Math.abs(mad(2));
              break;
            case 2:
              w = [1, 0, 0, 0, 0, 0, 0, 0, -1];
              result[i] = mad(0) + 127;
              result[i + 1] = mad(1) + 127;
              result[i + 2] = mad(2) + 127;
              break;
          }
        }
      }
      imageData.data.set(result);
      ctx2.putImageData(imageData, 0, 0);

      function mad(k) {
        let s = 0;
        for (let i = 0; i < 9; i++) {
          s += w[i] * pixel[j[i] + k];
        }
        return s;
      }
    }
  }, []);
  return (
    <div className="text-center">
      <h2 className="text-2xl pt-5">空間フィルタリング</h2>
      <form className="py-10">
        <input type="file" id="file" />
        <select id="menu">
          <option>平均化フィルタ</option>
          <option>ラプラシアンフィルタ</option>
          <option>エンボス処理</option>
        </select>
      </form>
      <p>処理前</p>
      <canvas id="canvas1"></canvas>
      <p>処理後</p>
      <canvas id="canvas2"></canvas>
    </div>
  );
};

export default page;
