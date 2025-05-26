import React, { useState } from 'react';
import styles from './Contact.module.css';
import { useNavigate } from 'react-router-dom';


function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const navigate=useNavigate();
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({
      submitted: true,
      error: false,
      message: 'Thank you for reaching out! We will get back to you within 24 hours.'
    });
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <>
      <div className={styles.page}>
      <div className={styles.backgroundOverlay}></div>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Contact DineSmart</h1>
          <p className={styles.headerDescription}>We're here to assist you with any questions or feedback you may have.</p>
        </div>
        
        <div className={styles.banner}>
          <div className={styles.bannerContent}>
            <h2 className={styles.bannerTitle}>Get in Touch with Our Team</h2>
            <p className={styles.bannerText}>Our customer support experts are available to help you navigate through any issues, answer your questions, or address your concerns.</p>
          </div>
        </div>
        
        <div className={`${styles.content} ${styles.container}`}>
          <div className={styles.infoWrapper}>
            <div className={styles.info}>
              <h2 className={styles.infoTitle}>Our Office</h2>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h3 className={styles.infoHeading}>Location</h3>
                  <p className={styles.infoText}>Shop no 69, Balaji Annexe</p>
                  <p className={styles.infoText}>Maharashtra, India - 400001</p>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h3 className={styles.infoHeading}>Email Us</h3>
                  <p className={styles.infoText}>General Inquiries: <a href="mailto:info@DineSmart.com" className={styles.infoLink}>info@DineSmart.com</a></p>
                  <p className={styles.infoText}>Customer Support: <a href="mailto:support@DineSmart.com" className={styles.infoLink}>support@DineSmart.com</a></p>
                  <p className={styles.infoText}>Business Partnership: <a href="mailto:partners@DineSmart.com" className={styles.infoLink}>partners@DineSmart.com</a></p>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <h3 className={styles.infoHeading}>Call Us</h3>
                  <p className={styles.infoText}>Customer Support: <a href="tel:+919876543210" className={styles.infoLink}>+91 98765 43210</a></p>
                  <p className={styles.infoText}>Business Inquiries: <a href="tel:+919876543211" className={styles.infoLink}>+91 98765 43211</a></p>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <h3 className={styles.infoHeading}>Working Hours</h3>
                  <p className={styles.infoText}>Monday to Friday: 9:00 AM - 6:00 PM IST</p>
                  <p className={styles.infoText}>Saturday: 10:00 AM - 2:00 PM IST</p>
                  <p className={styles.infoText}>Sunday: Closed</p>
                </div>
              </div>
            </div>
            
            <div className={styles.social}>
              <h3 className={styles.socialTitle}>Connect With Us</h3>
              <div className={styles.socialIcons}>
                <a 
                  href="https://x.com/home?lang=en-in" 
                  className={`${styles.socialIcon} fab fa-twitter`} 
                  aria-label="Twitter"
                >
                  <span className="sr-only">Twitter</span>
                </a>
                <a 
                  href="https://www.instagram.com/?__pwa=1" 
                  className={`${styles.socialIcon} fab fa-instagram`} 
                  aria-label="Instagram"
                >
                  <span className="sr-only">Instagram</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/anish-t-223238270/" 
                  className={`${styles.socialIcon} fab fa-linkedin-in`} 
                  aria-label="LinkedIn"
                >
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className={styles.formWrapper}>
            <div className={styles.form}>
              <h2 className={styles.formTitle}>Send Us a Message</h2>
              <p className={styles.formDescription}>Fill out the form below and our team will get back to you as soon as possible.</p>
              
              {formStatus.submitted && (
                <div className={styles.successMessage}>
                  {formStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>Full Name <span className={styles.required}>*</span></label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ravi Kumar" 
                      className={styles.formInput}
                      required 
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>Email Address <span className={styles.required}>*</span></label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="xyz@example.com" 
                      className={styles.formInput}
                      required 
                    />
                  </div>
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.formLabel}>Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="1234567890" 
                      className={styles.formInput}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.formLabel}>Subject <span className={styles.required}>*</span></label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?" 
                      className={styles.formInput}
                      required 
                    />
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>Your Message <span className={styles.required}>*</span></label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please provide details about your inquiry..." 
                    rows="6" 
                    className={styles.formTextarea}
                    required
                  ></textarea>
                </div>
                
                <div className={styles.formCheck}>
                  <input type="checkbox" id="privacy" className={styles.formCheckInput} required />
                  <label htmlFor="privacy" className={styles.formCheckLabel}>
                    I agree to the <a href="/privacy-policy" className={styles.formLink}>Privacy Policy</a> and consent to DineSmart processing my data.
                  </label>
                </div>
                
                <button type="submit" className={styles.submitButton}>Send Message</button>
              </form>
            </div>
          </div>
        </div>
        
        <div className={styles.faq}>
         <div className={styles.container}>
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
        <h3 className={styles.faqItemTitle}>How do I place an order on DineSmart?</h3>
        <p className={styles.faqItemText}>You can place an order by logging into your account, selecting a restaurant, choosing your dishes, and proceeding to checkout to confirm your order.</p>
        </div>
            <div className={styles.faqItem}>
            <h3 className={styles.faqItemTitle}>What payment methods do you accept?</h3>
            <p className={styles.faqItemText}>We accept credit/debit cards, UPI, mobile wallets, and cash on delivery for most locations.</p>
        </div>
           <div className={styles.faqItem}>
           <h3 className={styles.faqItemTitle}>How can I track my order?</h3>
           <p className={styles.faqItemText}>After placing an order, you can track it in real-time through the "Order Tracking" section in your DineSmart account.</p>
      </div>
      <div className={styles.faqItem}>
        <h3 className={styles.faqItemTitle}>What is your cancellation policy?</h3>
        <p className={styles.faqItemText}>Orders can be cancelled within 5 minutes of placement. After that, cancellation may be subject to restaurant policies.</p>
      </div>
      <div className={styles.faqItem}>
        <h3 className={styles.faqItemTitle}>Do you charge delivery fees?</h3>
        <p className={styles.faqItemText}>Delivery charges may vary based on your location and the restaurant. The applicable fee will be displayed at checkout before you confirm your order.</p>
      </div>
      <div className={styles.faqItem}>
        <h3 className={styles.faqItemTitle}>How can I provide feedback about my experience?</h3>
        <p className={styles.faqItemText}>You can share your feedback through the "Feedback" section in your DineSmart account, or contact our support team via the Contact Us page.</p>
      </div>
    </div>
    
    {/* Add this CTA section after the FAQ grid */}
    <div className={styles.faqCta}>
      <p className={styles.faqCtaText}>Didn't find the answer you were looking for?</p>
      <button 
        className={styles.faqCtaButton} 
        onClick={() => {
          navigate('/faq');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        Visit FAQ
      </button>
    </div>
  </div>
</div>
      </div>
    
    </>
  );
}

export default Contact;