import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";

function HomePage() {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p>
Discover your perfect home with Dreamestate, the premier online platform for buying and renting properties.
From cozy apartments to luxurious estates, we offer a diverse range of listings to suit every lifestyle and budget.
With our user-friendly interface and powerful search tools, finding your dream property has never been easier or more enjoyable.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>1+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>20</h1>
              <h2>Awards Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
