import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";
import useAlert from "../hooks/useAlert";

export const fetchMoreData = async (resource, setResource) => {
  const { setAlert } = useAlert();

  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    // console.log(err);
    setAlert("sorry, something went wrong.  Try again later.", "warning");
  }
};

export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? /* 
        If the profile matches the profile that has been clicked, increase
        followers_count and set following_id.
      */
      {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : /*
        If the profile belongs to the logged in user, increase
        following_count by 1
      */
      profile.is_owner
      ? {
          ...profile,
          following_count: profile.following_count + 1,
        }
      : /* 
          Return profile unchanged if it is not the profile
          that has been clicked on or does not belong to the
          logged in user.
        */
        profile;
};

export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? /*
        If the profile matches the profile that has been clicked, decrease
        followers_count and set following_id to null.
      */
      {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null,
      }
    : /*
        If the profile belongs to the logged in user, decrease
        following_count by 1
      */
      profile.is_owner
      ? {
          ...profile,
          following_count: profile.following_count - 1,
        }
      : /* 
          Return profile unchanged if it is not the profile
          that has been clicked on or does not belong to the
          logged in user.
        */
        profile;
};

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
