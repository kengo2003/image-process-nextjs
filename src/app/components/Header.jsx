"use client";
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="p-6">
      <Link href="/" className="text-4xl font-bold">
        画像変換フィルタアプリ
      </Link>
    </div>
  );
};

export default Header;
