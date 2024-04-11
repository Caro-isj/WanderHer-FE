import { Link } from "react-router-dom";
export const NotFound = () => {
  return (
    <div className="bg-notfound">
      <div className="not-found-page">
        <iframe
          src="https://giphy.com/embed/njYrp176NQsHS"
          width="480"
          height="200"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
        ></iframe>

        <h1>"Short cuts make long delays" -Pippin</h1>
        <Link to={"/dashboard"}>
          <button>So go back on the right path, hobit.</button>
        </Link>
      </div>
    </div>
  );
};
