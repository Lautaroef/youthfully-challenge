type SectionsType = "hot" | "top" | "user"; // Default: hot

type SortType = "viral" | "top" | "time" | "rising"; // Default: viral

type WindowType = "day" | "week" | "month" | "year" | "all"; // Change the date range of the request if the section is top. Default: day

interface IGalleryImage {
  id: string;
  title: string;
  description: string | null;
  ups: number;
  downs: number;
  score: number;
  views: number;
  comment_count: number;
  favorite_count: number;
  points: number;
  is_album: boolean;
  images?: IGalleryImage[];
  datetime: number;
  type: string;
  width: number;
  height: number;
  size: number;
  animated: boolean;
  bandwidth: number;
  vote: string | null;
  favorite: boolean;
  nsfw: boolean;
  section: string;
  account_url: string;
  account_id: number;
  is_ad: boolean;
  in_most_viral: boolean;
  has_sound: boolean;
  tags: string[];
  ad_type: number;
  ad_url: string;
  edited: number;
  in_gallery: boolean;
  topic: string | null;
  topic_id: number;
  link: string;
  mp4: string;
  gifv: string;
  hls: string;
  mp4_size: number;
  looping: boolean;
  processing: {
    status: string;
  };
  ad_config: {
    showsAds: boolean;
    safeFlags: string[];
    highRiskFlags: string[];
    unsafeFlags: string[];
    wallUnsafeFlags: string[];
  };
}
