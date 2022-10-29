import "./CookieSpinner.css";

const CookieSpinner = () => {
  return (
    <div className="eyes">
      <div className="eye"></div>
      <div className="eye"></div>
      <div className="mouth">
        <div className="text">I 'm loading</div>
        <div className="cookie"></div>
      </div>
    </div>
  );
};
export default CookieSpinner;
