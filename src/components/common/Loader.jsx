const Loader = ({ size = "md", inline = false }) => {
  const sizes = { sm: 16, md: 32, lg: 48 };
  const px = sizes[size] || 32;

  const style = inline
    ? { display: "inline-block", width: px, height: px, verticalAlign: "middle" }
    : { display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem 0" };

  return (
    <div style={inline ? {} : style} className={`loader-wrapper${inline ? " loader-inline" : ""}`}>
      <svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ animation: "spin 0.8s linear infinite", color: "inherit" }}
      >
        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
        <path d="M12 2a10 10 0 0 1 10 10" />
      </svg>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Loader;
