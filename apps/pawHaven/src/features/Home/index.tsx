import Hero from './components/Hero';
import LatestRescue from './components/LatestRescue';
import RecentStory from './components/RecentStory';

const Home = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <LatestRescue />
      <RecentStory />
    </div>
  );
};

export default Home;
