export type CreateLatestRequestDTO = {
    latest_wpm: number;
    latest_raw: number;
    latest_time: string;
};
  
export type CreateLatestResponseDTO = {
    latest_id: string;
};
  