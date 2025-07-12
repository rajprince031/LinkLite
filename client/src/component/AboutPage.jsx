import "../style/AboutPage.css";

const features = [
  {
    title: "Shorten with ease",
    description: "Turn long, complex URLs into short, clean, and customizable links in seconds."
  },
  {
    title: "Real-time analytics",
    description: "Track every click. Know who, when, and where—LinkLite gives you the insight you need."
  },
  {
    title: "Control your links",
    description: "Activate, deactivate, or limit access to your links anytime, with powerful admin controls."
  },
  {
    title: "Custom short links",
    description: "Personalize your short links to reflect your brand or purpose."
  },
  {
    title: "Built for security",
    description: "Your links are stored securely, and misuse is prevented with built-in protection features."
  },
  {
    title: "Smart filtering",
    description: "Filter analytics by IP address, date, or time. Find exactly what you're looking for."
  },
  {
    title: "Block by IP",
    description: "Protect your links by blocking suspicious or unwanted IP addresses."
  },
  {
    title: "Manage link history",
    description: "View, delete, or audit the full access history of your shortened links."
  },
  {
    title: "Ready for more",
    description: "Future-ready features like user accounts, QR code generation, and advanced analytics dashboards."
  }
];

const AboutPage = () => {

  return (
    <div className="about-container">
      <h1 className="about-title">About LinkLite</h1>
      <p className="about-description">
        LinkLite isn’t just another URL shortener—it’s your command center for clean, trackable,
        and secure links. Whether you're sharing for business, marketing, or personal use,
        LinkLite empowers you with powerful tools to manage every click.
      </p>
      <div className="features-grid">
        {features.map((feature, index) => (

          <div class="notification">
            <div class="notiglow"></div>
            <div class="notiborderglow"></div>
            <div class="notititle">{feature.title}</div>
            <div class="notibody">{feature.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default AboutPage;