import Footer from "./common/footer";

const footerItems = [
  {
    link: "/info",
    text: "Info",
  },
  {
    link: "/about",
    text: "About",
  },
];

const socialLinks = [
  {
    icon: "Github",
    link: "https://github.com/janbulling",
  },
];

const UseFooter: React.FC = () => (
  <Footer navItems={footerItems} socialLinks={socialLinks} />
);

export default UseFooter;