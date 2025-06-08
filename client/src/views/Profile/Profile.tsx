import React from 'react';

import ContactSection from '@/components/ContactSection';
import Layout from '@/components/Layout';
import MainHeroSection from '@/components/MainHeroSection';

import ProfileForm from './ProfileForm';

const Profile = () => (
  <Layout>
    <MainHeroSection title="Profil" />
    <ProfileForm />
    <ContactSection />
  </Layout>
);

export default Profile;
