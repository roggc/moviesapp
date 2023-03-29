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
