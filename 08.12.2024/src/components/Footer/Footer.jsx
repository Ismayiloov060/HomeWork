import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
<footer className="footer">
  <div className="footer-section">
    <h4>Discover More</h4>
    <ul>
      <li>
        <a href="#our-story">Our Story</a>
      </li>
      <li>
        <a href="#contact-us">Contact Us</a>
      </li>
    </ul>
  </div>
  <div className="footer-section">
    <h4>Explore</h4>
    <ul>
      <li>
        <a href="#help-center">Help Center</a>
      </li>
      <li>
        <a href="#tech-support">Technical Support</a>
      </li>
      <li>
        <a href="#data-protection">Data Protection</a>
      </li>
    </ul>
  </div>
  <div className="footer-section">
    <h4>Stay Connected</h4>
    <ul>
      <li>
        <a href="#tiktok">TikTok</a>
      </li>
      <li>
        <a href="#instagram">Instagram</a>
      </li>
      <li>
        <a href="#facebook">Facebook</a>
      </li>
    </ul>
  </div>
</footer>

  )
}
