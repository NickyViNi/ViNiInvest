import { useEffect } from "react";
import "./HomePage.css";
import { setNavbarBackgroundToTransparent } from "../../utils/navbar";

const HomePage = () => {
    // const [isLoaded, setIsLoaded] = useState(false);

    useEffect(setNavbarBackgroundToTransparent, []);

    return (
        <div className="homepage-container">
            {/* <div class="loader"></div> */}
            <img className="home-page-background-image" src="https://viniinvest-bucket.s3.us-west-2.amazonaws.com/stock-image.jpg" alt="stock image" />
            <h1 className="homepage-text">Welcome to ViNiInvest, embark on your journey towards greater financial prosperity!</h1>
        </div>
    )
}

export default HomePage
