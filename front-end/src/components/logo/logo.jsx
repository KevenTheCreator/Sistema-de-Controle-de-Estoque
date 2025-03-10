import React from 'react'
import { useEffect } from 'react';
import './logo.css'

const Logo = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const logo = document.querySelector('.logo');
    if (logo) {
      observer.observe(logo);
    }

    return () => {
      if (logo) {
        observer.unobserve(logo);
      }
    };
  }, []);
  return (
    <div>
      <img className='logo' src="/logo-principal.png" alt="" />
    </div>
  )
}

export default Logo
