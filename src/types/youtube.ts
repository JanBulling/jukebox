export type YoutubeResult = {
  etag: string;
  regionCode: string;
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: {
    etag: string;
    id: {
      videoId: string;
    };
  }[];
};

export type YoutubeVideo = {
  etag: string;
  id: string;
  contentDetails: {
    duration: string;
  };
};
