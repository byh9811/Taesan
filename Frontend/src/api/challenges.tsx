import axios from 'axios';
import { REACT_APP_URL, CHALLENGES } from 'constants/API_URL';

// postNewChallenge
export const postNewChallenge = async () => {
  try {
    const response = await axios.post(`${REACT_APP_URL}${CHALLENGES}/new`, {
      title: '챌린지 제목',
      period: '20221113',
      price: '1233312',
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('An error occurred while fetching data: ', error);
  }
};
// getExpireChallenge
export const getExpireChallenge = async () => {
  try {
    const response = await axios.get(`${REACT_APP_URL}${CHALLENGES}/expired`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('An error occurred while fetching data: ', error);
  }
};

// getStateChallenge
export const getStateChallenge = async () => {
  try {
    const response = await axios.get(`${REACT_APP_URL}${CHALLENGES}/state`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('An error occurred while fetching data: ', error);
  }
};

// postJoinChallenge
const id = '1';

export const postJoinChallenge = async () => {
  try {
    const response = await axios.post(`${REACT_APP_URL}${CHALLENGES}/${id}/join`, {
      code: '123123',
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('An error occurred while fetching data: ', error);
  }
};

// postExitChallenge
export const postExitChallenge = async () => {
  try {
    const response = await axios.post(`${REACT_APP_URL}${CHALLENGES}/${id}/exit`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('An error occurred while fetching data: ', error);
  }
};

// postStartChallenge
export const postStartChallenge = async () => {
  try {
    const response = await axios.post(`${REACT_APP_URL}${CHALLENGES}/${id}/start`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('An error occurred while fetching data: ', error);
  }
};

// getRecruitChallenge
export const getRecruitChallenge = async () => {
  try {
    const response = await axios.get(`${REACT_APP_URL}${CHALLENGES}/${id}/recruit`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('An error occurred while fetching data: ', error);
  }
};

// getProgressChallenge
export const getProgressChallenge = async () => {
  try {
    const response = await axios.get(`${REACT_APP_URL}${CHALLENGES}/${id}/progress`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('An error occurred while fetching data: ', error);
  }
};

// postTransfer
export const postTransfer = async () => {
  try {
    const response = await axios.post(`${REACT_APP_URL}${CHALLENGES}/transfer`, {
      challenge_id: '123',
      remaining_money: '1222311',
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('An error occurred while fetching data: ', error);
  }
};
