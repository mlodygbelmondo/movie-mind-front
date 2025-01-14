type AddMovieToFavoritesCommandParams = {
  userId: string;
  movieId: string;
};

type RemoveMovieFromFavoritesCommandParams = {
  userId: string;
  movieId: string;
};

type AddMovieToWatchLaterCommandParams = {
  userId: string;
  movieId: string;
};

type RemoveMovieFromWatchLaterCommandParams = {
  userId: string;
  movieId: string;
};

type AddReviewCommandParams = {
  userId: string;
  movieId: string;
  reviewId: string;
};

type LogOutCommandParams = {
  userId: string;
};

type AddFriendCommandParams = {
  friendId: string;
};

export const APICommands = {
  addMovieToFavorites: ({
    userId,
    movieId,
  }: AddMovieToFavoritesCommandParams) => {
    return {
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/Movie/favorite/${movieId}`,
      method: "POST",
    };
  },
  removeMovieFromFavorites: ({
    userId,
    movieId,
  }: RemoveMovieFromFavoritesCommandParams) => {
    return {
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/Movie/favorite/${movieId}`,
      method: "DELETE",
    };
  },
  addMovieToWatchLater: ({
    userId,
    movieId,
  }: AddMovieToWatchLaterCommandParams) => {
    return {
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/Movie/watchLater/${movieId}`,
      method: "POST",
    };
  },
  removeMovieFromWatchLater: ({
    userId,
    movieId,
  }: RemoveMovieFromWatchLaterCommandParams) => {
    return {
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/Movie/watchLater/${movieId}`,
      method: "DELETE",
    };
  },
  addReview: ({ userId, movieId, reviewId }: AddReviewCommandParams) => {
    return {
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/Review`,
      method: "POST",
    };
  },
  logIn: () => {
    return {
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/User/signin`,
      method: "POST",
    };
  },
  register: () => {
    return {
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/User/signup`,
      method: "POST",
    };
  },
  // logOut: ({ userId }: LogOutCommandParams): string =>
  //   `${process.env.NEXT_PUBLIC_API_URL}/logOut/${userId}`,
  sendFriendRequest: ({ friendId }: AddFriendCommandParams) => {
    return {
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/User/requests/${friendId}`,
      method: "POST",
    };
  },
  acceptFriendRequest: ({ friendId }: AddFriendCommandParams) => {
    return {
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/User/requests/${friendId}/accept`,
      method: "POST",
    };
  },
  rejectFriendRequest: ({ friendId }: AddFriendCommandParams) => {
    return {
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/User/requests/${friendId}/reject`,
      method: "POST",
    };
  },
};
