import Map from "../components/map/Map";

const Home = ({ theme }) => {
	return (
		<>
			<Map theme={theme} style={{ position: "absolute" }} />
		</>
	);
};

export default Home;
