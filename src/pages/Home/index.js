import BarChart from "./components/BarChart";

const Home = () => {
  return (
    <div>
      <BarChart title="Popularity among three frameworks" />
      <BarChart title="Coverage among three frameworks" />
    </div>
  );
};

export default Home;
