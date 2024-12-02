import logo from "../../public/assets/pixelpath-home-logo.jpg";

function SigninPage() {
  return (
    <div className="signin">
      <p className="welcome-message">
        Welcome to PixelPath, tracking your gaming journey, one pixel at a time!
      </p>
      <img className="logo" src={logo} />
      <p className="welcome-message">
        Our platform helps you seamlessly organize, track, and enhance your
        gaming journey. Whether you're curating your Game Library, searching for
        new titles, or looking for personalized recommendations that match your
        mood, PixelPath has you covered. Join us and transform the way you
        connect with your games!
      </p>
    </div>
  );
}

export default SigninPage;
