
const AppFooter = () => {
  return (
    <footer className="app-footer">
      <div className="footer-brand">
        <div className="footer-brand-icon" aria-hidden="true">
          ✦
        </div>

        <div>
          <h2>Notely</h2>
          <p>Every thought has a place.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Built with React · Made with care</p>
        <p>© {new Date().getFullYear()} Notely</p>
      </div>
    </footer>
  );
};

export default AppFooter;