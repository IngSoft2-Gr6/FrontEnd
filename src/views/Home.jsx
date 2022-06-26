import Map from "../components/map/Map";
import Searchbar from "../components/map/Search";

const Home = () => {
	return (
		<>
			<Searchbar/>
			<Map style={{position: "absolute"}}/>
		</>

	);
};

export default Home;
