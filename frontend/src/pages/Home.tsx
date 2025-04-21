import React from 'react';
import Header from '../components/Header';

const Home: React.FC = () => {
  return (
    <div>
      <Header title="Capstone Project" subtitle="Frontend with React.js + TypeScript" />
      <main>
        <h2>Welcome to Home Page</h2>
        <p>This is a starter template for your Capstone project.</p>
      </main>
    </div>
  );
};

export default Home;
