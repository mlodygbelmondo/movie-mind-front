type GetMovieParams = {
  movieId: string;
};

type GetMainPageDataParams = {
  userId: string;
};

type GetSocialPageDataParams = {
  userId: string;
};

type GetUserProfilePageDataParams = {
  userId: string;
};

export const APIQueries = {
  getRecommendedMovies: ({ movieId }: { movieId: string }): string =>
    `http://127.0.0.1:5001/getRecommendedMovies/${movieId}`,
  getMovie: ({ movieId }: GetMovieParams): string =>
    `${process.env.NEXT_PUBLIC_API_URL}/api/Movie/${movieId}`,
  getMainPageData: ({ userId }: GetMainPageDataParams): string =>
    `http://127.0.0.1:5001/getMainPageData/${userId}`,
  getAllMovies: ({ search }: { search: string }): string =>
    `http://127.0.0.1:5001/getAllMovies/${search}`,
  getSocialPageData: ({ userId }: GetSocialPageDataParams): string =>
    `http://127.0.0.1:5001/getSocialPageData/${userId}`,
  getUserProfilePageData: ({ userId }: GetUserProfilePageDataParams): string =>
    `${process.env.NEXT_PUBLIC_API_URL}/getUserProfilePageData/${userId}`,
  getFriends: ({ userId }: { userId: string }): string =>
    `http://127.0.0.1:5001/getFriends/${userId}`,
  getPendingFriendRequests: ({ userId }: { userId: string }): string =>
    `http://127.0.0.1:5001/getPendingFriendRequests/${userId}`,
  getNonFriends: ({ userId }: { userId: string }): string =>
    `http://127.0.0.1:5001/getNonFriends/${userId}`,
  getAdvancedMovieDetails: ({ movieId }: { movieId: string }): string =>
    `http://127.0.0.1:5001/getAdvancedMovieDetails/${movieId}`,
};
