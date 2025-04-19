import React from 'react';

import cx from 'clsx';

import Layout from '@/components/Layout';

import styles from './Home.module.scss';

const Home: React.FC = () => (
  <Layout>
    <div className={styles.container}>
      <div>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src="/images/react.svg" className={cx(styles.logo, styles.react)} alt="React logo" />
        </a>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/images/vite.svg" className={styles.logo} alt="Vite logo" />
        </a>
      </div>
      <h1 className={styles.title}>React + Vite</h1>
      <div className={styles.card}>
        <p className={styles.text}>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className={styles.docs}>Click on the React and Vite logos to learn more.</p>
    </div>
  </Layout>
);

export default Home;
