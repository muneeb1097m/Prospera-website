import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: '/Volumes/2nd Volume/Prospera website/prospera-website/.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-13',
  useCdn: false,
});

async function testConnection() {
  console.log('Testing Sanity connection with:');
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);

  try {
    // Try to fetch the list of document types
    const types = await client.fetch('*[0]._type');
    console.log('✅ Connection successful!');
    if (types) {
      console.log('Result found. Sanity is returning data.');
    } else {
      console.log('No documents found in dataset, but connection was successful.');
    }
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error(error.message);
  }
}

testConnection();
