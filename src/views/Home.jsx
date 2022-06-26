import Map from "../components/map/Map";
import Searchbar from "../components/map/Search";

const Home = ({theme}) => {
	return (
		<>
			<Searchbar />
			<Map theme={theme} style={{ position: "absolute" }} />
		</>
	);
};

export default Home;
