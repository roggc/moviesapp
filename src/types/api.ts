export type Movie = {
  poster_path: string;
  id: number;
  title: string;
  release_date: string;
};

export type ImageConfig = {
  base_url: string;
  poster_sizes: string[];
};

export type MovieDetails = Movie & {
  overview: string;
};

export type GuestSession = {
  sessionId: string;
  expiresAt: string;
  isSuccess: boolean;
};
