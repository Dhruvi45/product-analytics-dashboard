import axios from "axios";

const API_BASE_URL = "https://flipkart-email-mock.now.sh/";

export const getEmailList = async (page: number = 1) => {
    const response = await axios.get(API_BASE_URL).then((res) => {
        return res.data
    });
    return response
};

export const getEmailBody = async (id: string) => {

    const response = await axios.get(`${API_BASE_URL}?id=${id}`).then((res) => {
        return res.data
    });
    console.log("response", response)
    return response
};

// Utility Functions for localStorage
export const FAVORITE_KEY = 'favoriteEmails';
export const READ_KEY = 'readEmails';

// Get emails marked as favorite from localStorage
export const getFavoriteEmails = () => {
  return JSON.parse(localStorage.getItem(FAVORITE_KEY) || '[]');
};

// Get emails marked as read from localStorage
export const getReadEmails = () => {
  return JSON.parse(localStorage.getItem(READ_KEY) || '[]');
};

// Add or remove email from favorites
export const toggleFavoriteEmail = (emailId: string) => {
  let favorites = getFavoriteEmails();
  if (favorites.includes(emailId)) {
    favorites = favorites.filter((id: string) => id !== emailId); // Remove from favorites
  } else {
    favorites.push(emailId); // Add to favorites
  }
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites));
};

// Mark email as read
export const markEmailAsRead = (emailId: string) => {
  let readEmails = getReadEmails();
  if (!readEmails.includes(emailId)) {
    readEmails.push(emailId); // Add to read
    localStorage.setItem(READ_KEY, JSON.stringify(readEmails));
  }
};
