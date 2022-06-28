import Map from "../components/map/Map";
import Searchbar from "../components/map/Search";

const Home = ({ theme }) => {
	return (
		<>
			<Map theme={theme} style={{ position: "absolute" }} />
		</>
	);
};

export default Home;
