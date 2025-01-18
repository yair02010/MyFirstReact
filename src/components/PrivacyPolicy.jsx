import React from "react";
import Navbar from "./NavBar";
import "../css/privacyPolicy.css";
import Footer from "./Fotter";

function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="privacy-policy-container">
        <h1 className="privacy-policy-header">Privacy Policy</h1>
        <p className="privacy-policy-text">
          At <strong>BCard</strong>, we are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and protect the information you provide us.
        </p>
        <h2 className="privacy-policy-subheader">Information We Collect</h2>
        <p className="privacy-policy-text">
          We may collect the following information when you use our services:
        </p>
        <ul className="privacy-policy-list">
          <li>Personal information such as your name, email address, phone number, and address.</li>
          <li>Login credentials for your account.</li>
          <li>Usage data, including how you interact with our website.</li>
        </ul>
        <h2 className="privacy-policy-subheader">How We Use Your Information</h2>
        <p className="privacy-policy-text">
          We use your information to:
        </p>
        <ul className="privacy-policy-list">
          <li>Provide, operate, and maintain our services.</li>
          <li>Personalize your experience with our platform.</li>
          <li>Communicate with you, including for customer support and updates.</li>
          <li>Improve our services and user experience.</li>
        </ul>
        <h2 className="privacy-policy-subheader">How We Protect Your Information</h2>
        <p className="privacy-policy-text">
          We use technical and organizational security measures to protect your personal data against unauthorized access, theft, and loss. However, please note that no method of transmission over the internet or method of electronic storage is 100% secure.
        </p>
        <h2 className="privacy-policy-subheader">Your Privacy Rights</h2>
        <p className="privacy-policy-text">
          You have the right to:
        </p>
        <ul className="privacy-policy-list">
          <li>Access, update, or delete your personal information.</li>
          <li>Withdraw consent for us to process your data.</li>
          <li>Opt-out of marketing communications at any time.</li>
        </ul>
        <h2 className="privacy-policy-subheader">Contact Us</h2>
        <p className="privacy-policy-text">
          If you have any questions or concerns about our Privacy Policy, please contact us at <strong>support@bcard.com</strong>.
        </p>
        <p className="privacy-policy-text">Last updated: January 2025</p>
      </div>
          <Footer/>
    </>
  );
}

export default PrivacyPolicy;
