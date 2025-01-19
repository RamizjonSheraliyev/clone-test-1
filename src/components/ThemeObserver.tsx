'use client';
import {useEffect} from "react";

export default function ThemeObserver() {
  useEffect(() => {
    if (window.localStorage.getItem('theme') == 'dark') {
      const html = document.querySelector('html');
      if (html) {
        html.dataset.theme = window.localStorage.getItem('theme') || 'light';
      }
    }
  }, []);
  return (
    <>

    </>
  );
}