import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <div className="grid grid-cols-4 text-center bg-slate-300 ">
      <Link href="/grayscale">グレースケール化</Link>
      <Link href="/brightness">明るさの変換</Link>
      <Link href="/specialEffects">特殊効果</Link>
      <Link href="/">空間フィルタリング</Link>
    </div>
  );
};

export default Nav;
