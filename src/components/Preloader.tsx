'use client';
import {ScaleLoader} from "react-spinners";

export default function Preloader() {
  return (
    <>
      <div>
        <ScaleLoader
          color="#aaa"
          loading={true} speedMultiplier={4} />
      </div>
    </>
  );
}