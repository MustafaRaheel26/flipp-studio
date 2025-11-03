import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import "./ContactPage.css";

export default function ContactPage() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // EmailJS configuration - REPLACE THESE WITH YOUR ACTUAL KEYS
    const serviceID = "service_ickamra";
    const templateID = "template_n80zbnh";
    const publicKey = "-C5Hh7CuXDghDVb4w";

    emailjs
      .sendForm(serviceID, templateID, form.current, publicKey)
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          setSubmitStatus("success");
          form.current.reset();
        },
        (error) => {
          console.error("Email sending failed:", error.text);
          setSubmitStatus("error");
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <motion.div
      className="contact-sheet"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="contact-container">
        {/* Left Section */}
        <div className="contact-left">
          <h1 className="contact-heading">
            LET'S
            <br />
            CONNECT
          </h1>
        </div>

        {/* Right Section */}
        <div className="contact-right">
          <h2 className="contact-subtitle">
            Tell us a little bit about yourself and we'll get back to you as soon as we can.
          </h2>

          <form ref={form} className="contact-form" onSubmit={sendEmail}>
            <div className="form-group">
              <input 
                type="text" 
                name="user_name" 
                id="name"
                required 
                placeholder=" " 
                disabled={isSubmitting}
              />
              <label htmlFor="name">Name*</label>
            </div>

            <div className="form-group">
              <input 
                type="email" 
                name="user_email" 
                id="email"
                required 
                placeholder=" " 
                disabled={isSubmitting}
              />
              <label htmlFor="email">Email*</label>
            </div>

            <div className="form-group">
              <textarea 
                name="message" 
                id="message"
                rows="4" 
                required 
                placeholder=" " 
                disabled={isSubmitting}
              ></textarea>
              <label htmlFor="message">Message*</label>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <motion.div
                className="status-message success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Message sent successfully! We'll get back to you soon.
              </motion.div>
            )}
            
            {submitStatus === "error" && (
              <motion.div
                className="status-message error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Failed to send message. Please try again.
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="contact-submit"
              disabled={isSubmitting}
              whileHover={
                !isSubmitting
                  ? {
                      backgroundColor: "#fff",
                      color: "#000",
                      boxShadow: "0 0 20px rgba(255,255,255,0.1)",
                      transition: { duration: 0.3 }
                    }
                  : {}
              }
              whileTap={!isSubmitting ? { scale: 0.97 } : {}}
            >
              <span className="send-text">
                {isSubmitting ? "Sending..." : "Send"}
              </span>
              {!isSubmitting && (
                <motion.span
                  className="send-line"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                    delay: 1
                  }}
                ></motion.span>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}