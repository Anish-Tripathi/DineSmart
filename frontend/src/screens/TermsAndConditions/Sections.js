import {
  Shield,
  Book,
  Calendar,
  FileText,
  AlertTriangle,
  RefreshCw,
  LockKeyhole,
  MessageSquare,
} from "lucide-react";
import styles from "./TermsAndConditions.module.css";

export const sections = [
  {
    id: 1,
    title: "Acceptance of Terms",
    icon: <Shield className={styles.sectionIcon} size={24} />,
    content:
      "By using DineSmart, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree with any part of these terms, please do not access or use our platform or services. These terms constitute a legally binding agreement between you and DineSmart regarding your use of our platform.",
  },
  {
    id: 2,
    title: "User Responsibilities",
    icon: <Book className={styles.sectionIcon} size={24} />,
    content:
      "Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. You agree to provide accurate and complete information during registration and booking processes. You must promptly update any information to keep it accurate and complete. Misuse of the platform, including creating false bookings or engaging in disruptive behavior, may result in immediate account suspension.",
  },
  {
    id: 3,
    title: "Booking & Cancellation Policy",
    icon: <Calendar className={styles.sectionIcon} size={24} />,
    content:
      "All bookings made through DineSmart are subject to availability and confirmation from the restaurant. Bookings are not guaranteed until you receive a confirmation. Cancellations must be made at least 24 hours in advance to avoid potential charges. Repeated no-shows or late cancellations may result in restrictions on future bookings. Restaurants reserve the right to cancel bookings under certain circumstances, in which case you will be notified as soon as possible.",
  },
  {
    id: 4,
    title: "Intellectual Property",
    icon: <FileText className={styles.sectionIcon} size={24} />,
    content:
      "All content, features, and functionality of DineSmart, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, are owned by DineSmart or its licensors and are protected by copyright, trademark, and other intellectual property laws. Unauthorized use, reproduction, modification, distribution, or replication of any content is strictly prohibited.",
  },
  {
    id: 5,
    title: "Limitation of Liability",
    icon: <AlertTriangle className={styles.sectionIcon} size={24} />,
    content:
      "DineSmart serves as an intermediary platform connecting users with restaurants. We are not responsible for the quality, safety, or legality of the food, service, or experience provided by restaurants. DineSmart is not liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services, including issues related to food quality, hygiene, allergens, or restaurant service.",
  },
  {
    id: 6,
    title: "Changes to Terms",
    icon: <RefreshCw className={styles.sectionIcon} size={24} />,
    content:
      "DineSmart reserves the right to modify, amend, or update these terms and conditions at any time without prior notice. Any significant changes will be communicated through our platform or via email. Continued use of DineSmart after such changes constitutes your acceptance of the revised terms. We recommend periodically reviewing these terms to stay informed of any updates.",
  },
  {
    id: 7,
    title: "Privacy & Data Protection",
    icon: <LockKeyhole className={styles.sectionIcon} size={24} />,
    content:
      "Your privacy is important to us. We collect, use, and protect your personal information in accordance with our Privacy Policy, which is incorporated into these Terms by reference. By using DineSmart, you consent to the collection and use of your information as described in our Privacy Policy.",
  },
  {
    id: 8,
    title: "Customer Support",
    icon: <MessageSquare className={styles.sectionIcon} size={24} />,
    content:
      "For any questions, concerns, or assistance regarding these terms or our services, please contact our customer support team through the 'Contact Us' section on our platform. Our support team is available Monday through Friday, 9 AM to 8 PM, and weekends from 10 AM to 6 PM.",
  },
];
