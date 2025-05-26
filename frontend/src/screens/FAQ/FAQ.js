import React, { useState } from 'react';
import styles from './FAQ.module.css';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, 
  FaUtensils, 
  FaCreditCard, 
  FaTruck, 
  FaAward,
  FaSearch,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaEnvelope
} from 'react-icons/fa';

const faqSections = [
  {
    title: 'Customer Questions',
    icon: <FaUsers className={styles.sectionIcon} />,
    faqs: [
      {
        question: 'How do I book a table on DineSmart?',
        answer: 'Simply search for your favorite restaurant, select the date, time and number of guests, and confirm your booking instantly. You will receive a confirmation email once your reservation is successful.'
      },
      {
        question: 'Can I track my food orders in real-time?',
        answer: 'Yes! DineSmart allows you to track your orders live with our interactive map feature. You\'ll receive notifications when your order is being prepared, when it\'s out for delivery, and when your food is arriving.'
      },
      {
        question: 'Are there exclusive discounts available?',
        answer: 'Absolutely. Our platform offers special coupons and deals you won\'t find elsewhere! DineSmart Premium members receive early access to limited-time offers, happy hour specials, and seasonal promotions from our partner restaurants.'
      },
      {
        question: 'Is there an option to filter restaurants by nutrition or price?',
        answer: 'Yes, you can filter by nutritional value, price range, cuisine type, dietary restrictions, and estimated delivery time to find the perfect meal for you. Our advanced filters help you discover restaurants that match your exact preferences.'
      }
    ]
  },
  {
    title: 'Restaurant Owner Questions',
    icon: <FaUtensils className={styles.sectionIcon} />,
    faqs: [
      {
        question: 'How do I list my restaurant on DineSmart?',
        answer: 'Visit our business portal and complete the registration form. Our team will verify your details and onboard your restaurant within 48 hours. You\'ll gain access to our dashboard to manage menus, reservations, and orders.'
      },
      {
        question: 'What commission does DineSmart charge?',
        answer: 'We offer competitive rates starting at 10% per transaction, with customizable plans based on your restaurant size and volume. Premium partnerships with marketing benefits start at 15%.'
      },
      {
        question: 'How do I manage table availability?',
        answer: 'Our intuitive dashboard allows you to set opening hours, table configurations, and blackout dates in real-time. You can also enable automatic waitlist management during peak hours.'
      }
    ]
  },
  {
    title: 'Payment & Billing',
    icon: <FaCreditCard className={styles.sectionIcon} />,
    faqs: [
      {
        question: 'What payment methods are accepted on DineSmart?',
        answer: 'DineSmart accepts all major credit cards, debit cards, PayPal, Apple Pay, and Google Pay. You can also store multiple payment methods securely in your account for faster checkout.'
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Yes, we use bank-grade 256-bit SSL encryption and are PCI-DSS compliant. Your payment details are tokenized and never stored on our servers directly.'
      },
      {
        question: 'Can I get an invoice for my order?',
        answer: 'Detailed invoices are automatically generated for every transaction and can be accessed in your Order History. Business accounts can download monthly statements for accounting purposes.'
      }
    ]
  },
  {
    title: 'Delivery Services',
    icon: <FaTruck className={styles.sectionIcon} />,
    faqs: [
      {
        question: 'What are the delivery charges?',
        answer: 'Delivery fees vary by restaurant and distance, typically ranging from $2.99 to $5.99. Many restaurants offer free delivery promotions, especially for first-time customers.'
      },
      {
        question: 'How long does delivery usually take?',
        answer: 'Average delivery time is 30-45 minutes, depending on restaurant preparation time and your location. You can track your order in real-time for the most accurate estimate.'
      },
      {
        question: 'Can I schedule a delivery for later?',
        answer: 'Yes! When placing your order, simply select "Schedule for later" and choose your preferred delivery window (available up to 24 hours in advance).'
      }
    ]
  },
  {
    title: 'Account & Rewards',
    icon: <FaAward className={styles.sectionIcon} />,
    faqs: [
      {
        question: 'How do I join the DineSmart Rewards program?',
        answer: 'Sign up is automatic when you create your DineSmart account! Every order and reservation earns you points that can be redeemed for exclusive discounts, free delivery, or special menu items at participating restaurants.'
      },
      {
        question: 'Can I leave reviews for restaurants I\'ve visited?',
        answer: 'Yes, we encourage you to share your dining experiences. After your visit or delivery, you\'ll receive a prompt to rate your experience and leave detailed feedback that helps other diners make informed choices.'
      },
      {
        question: 'How do I reset my password?',
        answer: 'Click "Forgot Password" on the login page and enter your registered email. You\'ll receive a secure link to create a new password. For security reasons, password reset links expire after 30 minutes.'
      }
    ]
  }
];

const Faq = () => {
  const [activeIndices, setActiveIndices] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();

  const toggle = (sectionIndex, faqIndex) => {
    setActiveIndices(prev => ({
      ...prev,
      [`${sectionIndex}-${faqIndex}`]: !prev[`${sectionIndex}-${faqIndex}`]
    }));
  };

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const filteredSections = faqSections.map(section => ({
    ...section,
    faqs: section.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.faqs.length > 0);

  const allFAQs = faqSections.flatMap(section => section.faqs);
  const filteredAllFAQs = allFAQs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.faqBody}>
      <div className={styles.backgroundOverlay}></div>
    <div className={styles.faqContainer}>
      <div className={styles.faqHeader}>
        <h1 className={styles.heading}>Frequently Asked Questions</h1>
        <p className={styles.subheading}>Find answers to all your questions about DineSmart services</p>
        
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input 
            type="text" 
            className={styles.searchInput}
            placeholder="Search questions or topics..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className={styles.clearButton}
              onClick={() => setSearchTerm('')}
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>
      
      <div className={styles.faqContent}>
        {searchTerm ? (
          <div className={styles.searchResults}>
            <h3 className={styles.searchResultsTitle}>
              {filteredAllFAQs.length} results for "{searchTerm}"
            </h3>
            {filteredAllFAQs.length > 0 ? (
              filteredAllFAQs.map((faq, index) => (
                <div 
                  key={`search-${index}`} 
                  className={`${styles.faqItem} ${activeIndices[`search-${index}`] ? styles.active : ''}`}
                >
                  <div className={styles.question} onClick={() => toggle('search', index)}>
                    <span>{faq.question}</span>
                    <span className={styles.icon}>
                      {activeIndices[`search-${index}`] ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </div>
                  <div
                    className={styles.answer}
                    style={{ maxHeight: activeIndices[`search-${index}`] ? '300px' : '0px' }}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <p>No matching questions found. Try a different search term or browse our FAQ sections below.</p>
              </div>
            )}
          </div>
        ) : (
          filteredSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className={styles.section}>
              <div 
                className={styles.sectionHeader}
                onClick={() => toggleSection(sectionIndex)}
              >
                {section.icon}
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                <span className={styles.sectionToggle}>
                  {activeSection === sectionIndex ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
              <div 
                className={styles.sectionContent}
                style={{ 
                  maxHeight: activeSection === sectionIndex ? `${section.faqs.length * 100}px` : '0px',
                  opacity: activeSection === sectionIndex ? 1 : 0
                }}
              >
                {section.faqs.map((faq, faqIndex) => (
                  <div 
                    key={faqIndex} 
                    className={`${styles.faqItem} ${activeIndices[`${sectionIndex}-${faqIndex}`] ? styles.active : ''}`}
                  >
                    <div className={styles.question} onClick={() => toggle(sectionIndex, faqIndex)}>
                      <span>{faq.question}</span>
                      <span className={styles.icon}>
                        {activeIndices[`${sectionIndex}-${faqIndex}`] ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </div>
                    <div
                      className={styles.answer}
                      style={{ maxHeight: activeIndices[`${sectionIndex}-${faqIndex}`] ? '300px' : '0px' }}
                    >
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className={styles.contactSection}>
        <div className={styles.contactContent}>
          <h3>Still have questions?</h3>
          <p>Our customer support team is available 24/7 to assist you</p>
            <button 
              className={`${styles.contactButton} ${styles.primaryButton}`}
              onClick={() => {
                navigate('/contact-us');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <FaEnvelope /> Contact Support
            </button>
        </div>
        
      </div>
    </div>
    </div>
  );
};

export default Faq;