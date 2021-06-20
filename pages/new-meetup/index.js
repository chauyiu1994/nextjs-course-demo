import Head from 'next/head';

import { useRouter } from 'next/router';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: { 'Content-Type': 'application/json' },
    });

    await response.json();

    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own neetups and create amazing networking opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetupPage;
