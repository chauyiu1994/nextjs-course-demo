import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
};

// // good for dynamic request which change per request
// // html will be generated per request
// export const getServerSideProps = async (context) => {

//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

// this code is run on the server instead of client
// good for static data which do not change frequently
export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://dev:dev123@cluster0.dawig.mongodb.net/meetups?retryWrites=true&w=majority'
  );

  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    // html will be regenerated on the server each 10 seconds
    revalidate: 10,
  };
}

export default HomePage;
