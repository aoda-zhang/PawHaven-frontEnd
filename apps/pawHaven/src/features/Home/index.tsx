import Hero from './Hero';
import styles from './index.module.css';
import LatestRescue from './LatestRescue';
import RecentStory from './RecentStory';

const Home = () => {
  return (
    <div className={styles.home}>
      <Hero />
      <LatestRescue />
      <RecentStory />
    </div>
  );
};

export default Home;
