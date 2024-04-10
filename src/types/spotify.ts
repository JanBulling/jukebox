export type Album = {
  images: { url: string }[];
  name: string;
};

export type Artist = {
  images: { url: string }[];
  name: string;
};

export type Track = {
  album: Album;
  artists: Artist[];
  duration_ms: number;
  id: string;
  name: string;
};

export type TrachSearchResult = {
  tracks: {
    next: string | null;
    previous: string | null;
    total: number;
    items: Track[];
  };
};

type AnalysisTrack = {
  num_samples: number;
  duration: number;
  loudness: number;
  tempo: number; // beats per minute
  tempo_confidence: number; // between 0-1
  time_signature: number; // from n=3-7 -> time signature of n/4
  time_signature_confidence: number; // between 0-1
  key: number; // 0 -> C, 1 -> C♯/D♭, ... (-1 -> 11)
  key_confidence: number;
  mode: number; // 0 -> minor, 1 -> major
  mode_confidence: number;
};

//The time intervals of the bars throughout the track. A bar (or measure) is a segment of time defined as a given number of beats.
type Bar = {
  start: number; // in seconds
  duration: number; // in seconds
};

// The time intervals of beats throughout the track. A beat is the basic time unit of a piece of music; for example, each tick of a metronome. Beats are typically multiples of tatums.
type Beat = {
  start: number;
  duration: number;
};

// Sections are defined by large variations in rhythm or timbre, e.g. chorus, verse, bridge, guitar solo, etc. Each section contains its own descriptions of tempo, key, mode, time_signature, and loudness.
export type Section = {
  start: number;
  duration: number;
  loudness: number; // in dB
  tempo: number;
  key: number;
  mode: number;
  time_signature: number;
};

// Each segment contains a roughly conisistent sound throughout its duration.
export type Segment = {
  start: number;
  duration: number;
  confidence: number;
  loudness_start: number;
  loudness_max: number; // in dB
  pitches: number[];
  timbre: number[];
};

// A tatum represents the lowest regular pulse train that a listener intuitively infers from the timing of perceived musical events (segments).
type Tatum = {
  start: number;
  duration: number;
};

export type TrackAnalysis = {
  track: AnalysisTrack;
  bars: Bar[];
  beats: Beat[];
  sections: Section[];
  segments: Segment[];
  tatums: Tatum[];
};

export type AccessToken = {
  accessToken: string | null;
  refreshed?: boolean;
  expiresIn?: number;
};
