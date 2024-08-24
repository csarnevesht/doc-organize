import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';
const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN';

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({ version: 'v3', auth: oAuth2Client });

export const getProfile = async (userId: string) => {
  try {
    const response = await drive.files.get({
      fileId: 'profile.json',
      alt: 'media',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

export const updateProfile = async (userId: string, profile: any) => {
  try {
    await drive.files.update({
      fileId: 'profile.json',
      media: {
        mimeType: 'application/json',
        body: JSON.stringify(profile),
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};